import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  async hash(password: string): Promise<string> {
    const authConfig = this.configService.get('auth');
    return bcrypt.hash(password, authConfig.password.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
