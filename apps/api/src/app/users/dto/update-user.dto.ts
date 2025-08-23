import { IsOptional, IsString, Length } from 'class-validator';
import { IUpdateUserDto as UpdateUserDtoSchema } from '@repo/schemas';

export class UpdateUserDto implements UpdateUserDtoSchema {
  @IsOptional()
  @IsString()
  @Length(1, 120)
  name?: string;
}
