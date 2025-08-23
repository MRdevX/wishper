export interface IBaseEntity {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date;
}

export interface IApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
