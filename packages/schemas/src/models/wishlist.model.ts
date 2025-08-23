import { IBaseEntity } from './base.model';
import { IUser } from './user.model';
import { IWish } from './wish.model';

export interface IWishlist extends IBaseEntity {
  name: string;
  owner: IUser;
  wishes?: IWish[];
}
