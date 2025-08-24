import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const authConfig = configService.get('auth');
        return {
          secret: authConfig.jwt.access.secret,
          signOptions: {
            expiresIn: authConfig.jwt.access.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
