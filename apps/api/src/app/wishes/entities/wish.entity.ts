import { Entity, Column, ManyToOne } from 'typeorm';
import { IWish, WishStatus } from '@repo/schemas';
import { User } from '../../users/entities/user.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { TypeOrmBaseModel } from '../../core/base/typeorm/typeorm.base.entity';

@Entity()
export class Wish extends TypeOrmBaseModel implements IWish {
  @ManyToOne(() => User, u => u.wishes, { onDelete: 'CASCADE' })
  owner: User;

  @ManyToOne(() => Wishlist, wl => wl.wishes, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  wishlist?: Wishlist | null;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'enum', enum: WishStatus, default: WishStatus.ACTIVE })
  status: WishStatus;

  @Column({ type: 'jsonb', default: {} })
  details: Record<string, any>;
}
