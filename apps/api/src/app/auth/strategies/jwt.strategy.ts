import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokensService } from '../tokens/tokens.service';
import { TokenPayload } from '../interfaces/auth.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokensService: TokensService
  ) {
    const authConfig = configService.get('auth');
    if (!authConfig?.jwt?.access?.secret) {
      throw new Error('JWT_ACCESS_SECRET is not defined in auth config');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwt.access.secret,
    });
  }

  async validate(payload: TokenPayload) {
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid token type');
    }

    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
