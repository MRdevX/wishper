import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Wishlist } from '../entities/wishlist.entity';

@Injectable()
export class WishlistRepository extends BaseRepository<Wishlist> {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>
  ) {
    super(wishlistRepository);
  }

  async findByOwner(ownerId: string): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['wishes'],
    });
  }

  async findWithWishes(id: string): Promise<Wishlist | null> {
    return this.wishlistRepository.findOne({
      where: { id },
      relations: ['wishes', 'owner'],
    });
  }

  async findByOwnerWithPagination(
    ownerId: string,
    skip: number = 0,
    take: number = 10
  ): Promise<{ wishlists: Wishlist[]; total: number }> {
    const [wishlists, total] = await this.wishlistRepository.findAndCount({
      where: { owner: { id: ownerId } },
      relations: ['wishes'],
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return { wishlists, total };
  }

  async countByOwner(ownerId: string): Promise<number> {
    return this.wishlistRepository.count({
      where: { owner: { id: ownerId } },
    });
  }

  async findByNameAndOwner(name: string, ownerId: string): Promise<Wishlist | null> {
    return this.wishlistRepository.findOne({
      where: { name, owner: { id: ownerId } },
    });
  }
}
