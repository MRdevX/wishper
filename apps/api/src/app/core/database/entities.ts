import { User } from '../../users/entities/user.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Token } from '../../auth/entities/token.entity';

export const entities = [User, Wishlist, Wish, Token];
