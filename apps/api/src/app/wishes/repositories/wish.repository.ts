import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { Wish } from '../entities/wish.entity';
import { WishStatus } from '@repo/schemas';

@Injectable()
export class WishRepository extends BaseRepository<Wish> {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>
  ) {
    super(wishRepository);
  }

  async findByOwner(ownerId: string): Promise<Wish[]> {
    return this.wishRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['wishlist'],
    });
  }

  async findByWishlist(wishlistId: string): Promise<Wish[]> {
    return this.wishRepository.find({
      where: { wishlist: { id: wishlistId } },
      relations: ['owner'],
    });
  }

  async findByOwnerAndStatus(ownerId: string, status: WishStatus): Promise<Wish[]> {
    return this.wishRepository.find({
      where: { owner: { id: ownerId }, status },
      relations: ['wishlist'],
    });
  }

  async findWithRelations(id: string): Promise<Wish | null> {
    return this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'wishlist'],
    });
  }

  async countByOwner(ownerId: string): Promise<number> {
    return this.wishRepository.count({
      where: { owner: { id: ownerId } },
    });
  }

  async findByOwnerWithPagination(
    ownerId: string,
    skip: number = 0,
    take: number = 10
  ): Promise<{ wishes: Wish[]; total: number }> {
    const [wishes, total] = await this.wishRepository.findAndCount({
      where: { owner: { id: ownerId } },
      relations: ['wishlist'],
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return { wishes, total };
  }
}
