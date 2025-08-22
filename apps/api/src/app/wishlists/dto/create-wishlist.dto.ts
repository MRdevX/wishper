import { IsString, Length } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 120)
  name: string;
}
