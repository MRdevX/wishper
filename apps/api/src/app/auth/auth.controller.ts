import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: Implement authentication endpoints
  // - POST /auth/login
  // - POST /auth/register
  // - POST /auth/logout
  // - GET /auth/me
}
