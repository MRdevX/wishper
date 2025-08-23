import { WishStatus } from '../types/wish-status.enum';
import { IBaseEntity } from './base.model';
import { IUser } from './user.model';
import { IWishlist } from './wishlist.model';

export interface IWish extends IBaseEntity {
  title: string;
  note?: string;
  status: WishStatus;
  details: Record<string, any>;
  owner: IUser;
  wishlist?: IWishlist | null;
}

export interface IWishDetails {
  price?: number;
  url?: string;
  imageUrl?: string;
  priority?: 'low' | 'medium' | 'high';
  description?: string;
  isPurchased?: boolean;
}
