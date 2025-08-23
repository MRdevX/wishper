import { IsOptional, IsString, IsEnum, Length, IsObject } from 'class-validator';
import { IUpdateWishDto, WishStatus } from '@repo/schemas';

export class UpdateWishDto implements IUpdateWishDto {
  @IsOptional()
  @IsString()
  @Length(1, 200)
  title?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsEnum(WishStatus)
  status?: WishStatus;

  @IsOptional()
  @IsObject()
  details?: Record<string, any>;

  @IsOptional()
  @IsString()
  wishlistId?: string;
}
