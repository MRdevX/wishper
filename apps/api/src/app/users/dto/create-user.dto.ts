import { IsEmail, IsString, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(1, 120)
  name?: string;
}
