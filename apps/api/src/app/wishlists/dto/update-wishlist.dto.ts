import { IsOptional, IsString, Length } from 'class-validator';
import { IUpdateWishlistDto as UpdateWishlistDtoSchema } from '@repo/schemas';

export class UpdateWishlistDto implements UpdateWishlistDtoSchema {
  @IsOptional()
  @IsString()
  @Length(1, 120)
  name?: string;
}
