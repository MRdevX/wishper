import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { TokensService } from './tokens/tokens.service';
import { TokenPair, UserWithoutPassword, AuthResponse } from './interfaces/auth.interfaces';
import { TokenService } from './services/token.service';
import { PasswordService } from './services/password.service';
import { UserRepository } from './repositories/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokensService: TokensService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, name } = registerDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.passwordService.hash(password);

    const savedUser = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    const tokens = this.tokensService.generateTokenPair(savedUser.id, savedUser.email);

    await this.tokenService.createRefreshToken(savedUser.id, tokens.refreshToken);

    const { password: unusedPassword, ...userWithoutSensitiveData } = savedUser;

    return {
      user: userWithoutSensitiveData as UserWithoutPassword,
      tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.tokensService.generateTokenPair(user.id, user.email);

    await this.tokenService.createRefreshToken(user.id, tokens.refreshToken);

    const { password: unusedPassword, ...userWithoutSensitiveData } = user;

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

    const user = await this.userRepository.findByEmail(email);
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

    const hashedPassword = await this.passwordService.hash(password);

    await this.userRepository.updatePassword(resetTokenEntity.userId, hashedPassword);

    await this.tokenService.deletePasswordResetToken(resetTokenEntity.userId);

    return { message: 'Password has been reset successfully' };
  }

  async validateUser(email: string, password: string): Promise<UserWithoutPassword | null> {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (user && user.password && (await this.passwordService.compare(password, user.password))) {
      const { password: unusedPassword, ...result } = user;
      return result as UserWithoutPassword;
    }

    return null;
  }
}
