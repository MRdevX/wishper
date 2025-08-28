import { WishStatus } from '@repo/schemas';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishRepository } from './repositories/wish.repository';
import { BaseService } from '../core/base/base.service';

@Injectable()
export class WishesService extends BaseService<Wish> {
  constructor(private readonly wishRepository: WishRepository) {
    super(wishRepository);
  }

  async createWish(createWishDto: CreateWishDto, ownerId: string): Promise<Wish> {
    const wishData: any = {
      ...createWishDto,
      owner: { id: ownerId } as any,
    };

    if (createWishDto.wishlistId) {
      wishData.wishlist = { id: createWishDto.wishlistId } as any;
    }

    return this.wishRepository.create(wishData);
  }

  async findWithRelations(id: string): Promise<Wish> {
    const wish = await this.wishRepository.findWithRelations(id);
    if (!wish) {
      throw new NotFoundException(`Wish with ID ${id} not found`);
    }
    return wish;
  }

  async findByOwner(ownerId: string): Promise<Wish[]> {
    return this.wishRepository.findByOwner(ownerId);
  }

  async findByWishlist(wishlistId: string): Promise<Wish[]> {
    return this.wishRepository.findByWishlist(wishlistId);
  }

  async findByOwnerAndStatus(ownerId: string, status: WishStatus): Promise<Wish[]> {
    return this.wishRepository.findByOwnerAndStatus(ownerId, status);
  }

  async findByOwnerWithPagination(
    ownerId: string,
    skip: number = 0,
    take: number = 10
  ): Promise<{ wishes: Wish[]; total: number }> {
    return this.wishRepository.findByOwnerWithPagination(ownerId, skip, take);
  }

  async countByOwner(ownerId: string): Promise<number> {
    return this.wishRepository.countByOwner(ownerId);
  }

  async updateWish(id: string, updateWishDto: UpdateWishDto): Promise<Wish> {
    const updateData: any = { ...updateWishDto };
    if (updateWishDto.wishlistId) {
      updateData.wishlist = { id: updateWishDto.wishlistId } as any;
    }

    return super.update(id, updateData);
  }
}
