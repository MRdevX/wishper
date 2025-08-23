import { ICreateUserDto as CreateUserDtoSchema } from '@repo/schemas';
import { IsEmail, IsString, IsOptional, Length, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto implements CreateUserDtoSchema {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsString()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsString()
  @Length(1, 120)
  name?: string;
}
