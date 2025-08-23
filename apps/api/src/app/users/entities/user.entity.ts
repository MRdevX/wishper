import { Entity, Column, OneToMany, Index } from 'typeorm';
import { IUser as UserSchema } from '@repo/schemas';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { BaseModel } from '../../core/base/base.entity';

@Entity()
export class User extends BaseModel implements UserSchema {
  @Index({ unique: true })
  @Column({ length: 190 })
  email: string;

  @Column({ length: 120, nullable: true })
  name?: string;

  @OneToMany(() => Wish, w => w.owner)
  wishes: Wish[];

  @OneToMany(() => Wishlist, wl => wl.owner)
  wishlists: Wishlist[];
}
