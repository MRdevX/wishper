import { Entity, Column, OneToMany, Index, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IUser } from '@repo/schemas';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { BaseModel } from '../../core/base/base.entity';

@Entity()
export class User extends BaseModel implements IUser {
  @Index({ unique: true })
  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 120, nullable: true })
  name?: string;

  @OneToMany(() => Wish, w => w.owner)
  wishes: Wish[];

  @OneToMany(() => Wishlist, wl => wl.owner)
  wishlists: Wishlist[];

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    if (this.email) {
      this.email = this.email.trim().toLowerCase();
    }
  }
}
