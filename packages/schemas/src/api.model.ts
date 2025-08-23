import { IUser } from './models/user.model';
import { IWish } from './models/wish.model';
import { IWishlist } from './models/wishlist.model';
import { IApiResponse } from './models/base.model';

export type UsersResponse = IApiResponse<IUser[]>;
export type UserResponse = IApiResponse<IUser>;
export type WishesResponse = IApiResponse<IWish[]>;
export type WishResponse = IApiResponse<IWish>;
export type WishlistsResponse = IApiResponse<IWishlist[]>;
export type WishlistResponse = IApiResponse<IWishlist>;
