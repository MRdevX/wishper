import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { BaseRepository } from '../core/base/base.repositorty';

@Injectable()
export class WishlistsService extends BaseRepository<Wishlist> {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {
    super(wishlistRepository);
  }

  async findByOwner(ownerId: string): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['wishes'],
    });
  }

  async findByIdWithWishes(id: string): Promise<Wishlist | null> {
    return this.wishlistRepository.findOne({
      where: { id },
      relations: ['wishes', 'owner'],
    });
  }

  async createWishlist(
    createWishlistDto: CreateWishlistDto,
    ownerId: string,
  ): Promise<Wishlist> {
    return super.create({
      ...createWishlistDto,
      owner: { id: ownerId } as any,
    });
  }

  async update(
    id: string,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    const wishlist = await this.findById(id);
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
    const updatedWishlist = await super.update(id, updateWishlistDto);
    if (!updatedWishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
    return updatedWishlist;
  }
}
