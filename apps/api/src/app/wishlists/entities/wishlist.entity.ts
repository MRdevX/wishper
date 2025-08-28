import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { IWishlist } from '@repo/schemas';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { TypeOrmBaseModel } from '../../core/base/typeorm/typeorm.base.entity';

@Entity()
export class Wishlist extends TypeOrmBaseModel implements IWishlist {
  @ManyToOne(() => User, u => u.wishlists, { onDelete: 'CASCADE' })
  owner: User;

  @Column({ length: 120 })
  name: string;

  @OneToMany(() => Wish, w => w.wishlist)
  wishes: Wish[];
}
