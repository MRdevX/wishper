import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';
import { Token } from './entities/token.entity';
import { TokensModule } from './tokens/tokens.module';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token]), PassportModule, ConfigModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
