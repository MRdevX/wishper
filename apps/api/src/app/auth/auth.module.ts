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
import { PasswordService } from './services/password.service';
import { TokenRepository } from './repositories/token.repository';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    PassportModule,
    ConfigModule,
    TokensModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    PasswordService,
    TokenRepository,
    JwtStrategy,
    LocalStrategy,
    PermissionsGuard,
  ],
  exports: [AuthService, TokenService, PermissionsGuard],
})
export class AuthModule {}
