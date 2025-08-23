import { IsString, Length } from 'class-validator';
import { ICreateWishlistDto as CreateWishlistDtoSchema } from '@repo/schemas';

export class CreateWishlistDto implements CreateWishlistDtoSchema {
  @IsString()
  @Length(1, 120)
  name: string;
}
