import { IsEmail, IsString, IsOptional, Length } from 'class-validator';
import { ICreateUserDto as CreateUserDtoSchema } from '@repo/schemas';

export class CreateUserDto implements CreateUserDtoSchema {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(1, 120)
  name?: string;
}
