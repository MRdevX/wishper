import { IsString, IsOptional, IsEnum, Length, IsObject } from 'class-validator';
import { ICreateWishDto, WishStatus } from '@repo/schemas';

export class CreateWishDto implements ICreateWishDto {
  @IsString()
  @Length(1, 200)
  title: string;

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
