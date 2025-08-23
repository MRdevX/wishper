import { IBaseEntity } from './base.model';

export interface IUser extends IBaseEntity {
  email: string;
  name?: string;
}
