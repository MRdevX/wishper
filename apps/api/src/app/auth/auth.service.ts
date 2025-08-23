import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { TokensService, TokenPair } from './tokens/tokens.service';
import { TokenService } from './services/token.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokensService: TokensService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService
  ) {}

  async register(registerDto: RegisterDto): Promise<{
    user: UserWithoutPassword;
    tokens: TokenPair;
  }> {
    const { email, password, name } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const authConfig = this.configService.get('auth');
    const hashedPassword = await bcrypt.hash(password, authConfig.password.saltRounds);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    const savedUser = await this.userRepository.save(user);

    const tokens = this.tokensService.generateTokenPair(savedUser.id, savedUser.email);

    await this.tokenService.createRefreshToken(savedUser.id, tokens.refreshToken);

    const { password: _, ...userWithoutSensitiveData } = savedUser;

    return {
      user: userWithoutSensitiveData as UserWithoutPassword,
      tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<{
    user: UserWithoutPassword;
    tokens: TokenPair;
  }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password'],
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.tokensService.generateTokenPair(user.id, user.email);

    await this.tokenService.createRefreshToken(user.id, tokens.refreshToken);

    const { password: _, ...userWithoutSensitiveData } = user;

    return {
      user: userWithoutSensitiveData as UserWithoutPassword,
      tokens,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.tokenService.deleteRefreshToken(userId);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<TokenPair> {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = this.tokensService.verifyRefreshToken(refreshToken);

      const tokenEntity = await this.tokenService.findRefreshToken(payload.sub, refreshToken);
      if (!tokenEntity || tokenEntity.isExpired()) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = this.tokensService.generateTokenPair(payload.sub, payload.email);

      await this.tokenService.createRefreshToken(payload.sub, tokens.refreshToken);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return { message: 'If a user with this email exists, a password reset link has been sent' };
    }

    const resetTokenEntity = await this.tokenService.createPasswordResetToken(user.id);

    console.log(`Password reset token for ${email}: ${resetTokenEntity.token}`);

    return { message: 'If a user with this email exists, a password reset link has been sent' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { token, password } = resetPasswordDto;

    const resetTokenEntity = await this.tokenService.findPasswordResetToken(token);
    if (!resetTokenEntity || resetTokenEntity.isExpired()) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const authConfig = this.configService.get('auth');
    const hashedPassword = await bcrypt.hash(password, authConfig.password.saltRounds);

    await this.userRepository.update(resetTokenEntity.userId, {
      password: hashedPassword,
    });

    await this.tokenService.deletePasswordResetToken(resetTokenEntity.userId);

    return { message: 'Password has been reset successfully' };
  }

  async validateUser(email: string, password: string): Promise<UserWithoutPassword | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password'],
    });

    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result as UserWithoutPassword;
    }

    return null;
  }
}
