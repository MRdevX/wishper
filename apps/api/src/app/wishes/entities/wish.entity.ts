import { Entity, Column, ManyToOne } from 'typeorm';
import { IWish as WishSchema, WishStatus as WishStatusSchema } from '@repo/schemas';
import { User } from '../../users/entities/user.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { BaseModel } from '../../core/base/base.entity';

export enum WishStatus {
  ACTIVE = 'ACTIVE',
  ACHIEVED = 'ACHIEVED',
  ARCHIVED = 'ARCHIVED',
}

@Entity()
export class Wish extends BaseModel implements WishSchema {
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

// Re-export the schema enum for consistency
export { WishStatusSchema };
