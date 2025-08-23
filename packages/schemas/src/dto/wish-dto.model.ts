export interface ICreateWishDto {
  title: string;
  note?: string;
  status?: string;
  details?: Record<string, any>;
  wishlistId?: string;
}

export interface IUpdateWishDto {
  title?: string;
  note?: string;
  status?: string;
  details?: Record<string, any>;
  wishlistId?: string;
}
