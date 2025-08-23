import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Token, TokenType } from '../entities/token.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly configService: ConfigService
  ) {}

  async createRefreshToken(userId: string, token: string): Promise<Token> {
    await this.tokenRepository.delete({
      userId,
      type: TokenType.REFRESH,
    });

    const authConfig = this.configService.get('auth');
    const refreshTokenExpiry = new Date(
      Date.now() + this.parseDuration(authConfig.jwt.refresh.expiresIn)
    );

    const refreshToken = this.tokenRepository.create({
      userId,
      token,
      type: TokenType.REFRESH,
      expiresAt: refreshTokenExpiry,
    });

    return this.tokenRepository.save(refreshToken);
  }

  async createPasswordResetToken(userId: string): Promise<Token> {
    await this.tokenRepository.delete({
      userId,
      type: TokenType.PASSWORD_RESET,
    });

    const resetToken = randomBytes(32).toString('hex');
    const authConfig = this.configService.get('auth');
    const expiresAt = new Date(Date.now() + authConfig.reset.expiresIn);

    const passwordResetToken = this.tokenRepository.create({
      userId,
      token: resetToken,
      type: TokenType.PASSWORD_RESET,
      expiresAt,
    });

    return this.tokenRepository.save(passwordResetToken);
  }

  async findRefreshToken(userId: string, token: string): Promise<Token | null> {
    return this.tokenRepository.findOne({
      where: {
        userId,
        token,
        type: TokenType.REFRESH,
      },
    });
  }

  async findPasswordResetToken(token: string): Promise<Token | null> {
    return this.tokenRepository.findOne({
      where: {
        token,
        type: TokenType.PASSWORD_RESET,
      },
    });
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    await this.tokenRepository.delete({
      userId,
      type: TokenType.REFRESH,
    });
  }

  async deletePasswordResetToken(userId: string): Promise<void> {
    await this.tokenRepository.delete({
      userId,
      type: TokenType.PASSWORD_RESET,
    });
  }

  async cleanupExpiredTokens(): Promise<void> {
    await this.tokenRepository
      .createQueryBuilder()
      .delete()
      .where('expiresAt < :now', { now: new Date() })
      .execute();
  }

  private parseDuration(duration: string): number {
    const unit = duration.slice(-1);
    const value = parseInt(duration.slice(0, -1), 10);

    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return parseInt(duration, 10);
    }
  }
}
