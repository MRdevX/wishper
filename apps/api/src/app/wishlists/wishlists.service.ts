import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistRepository } from './repositories/wishlist.repository';

@Injectable()
export class WishlistsService {
  constructor(private readonly wishlistRepository: WishlistRepository) {}

  async create(createWishlistDto: CreateWishlistDto, ownerId: string): Promise<Wishlist> {
    const existingWishlist = await this.wishlistRepository.findByNameAndOwner(
      createWishlistDto.name,
      ownerId
    );

    if (existingWishlist) {
      throw new ConflictException('Wishlist with this name already exists');
    }

    return this.wishlistRepository.create({
      ...createWishlistDto,
      owner: { id: ownerId } as any,
    });
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.findAll();
  }

  async findById(id: string): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findById(id);
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
    return wishlist;
  }

  async findWithWishes(id: string): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findWithWishes(id);
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
    return wishlist;
  }

  async findByOwner(ownerId: string): Promise<Wishlist[]> {
    return this.wishlistRepository.findByOwner(ownerId);
  }

  async findByOwnerWithPagination(
    ownerId: string,
    skip: number = 0,
    take: number = 10
  ): Promise<{ wishlists: Wishlist[]; total: number }> {
    return this.wishlistRepository.findByOwnerWithPagination(ownerId, skip, take);
  }

  async countByOwner(ownerId: string): Promise<number> {
    return this.wishlistRepository.countByOwner(ownerId);
  }

  async update(id: string, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findById(id);
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }

    if (updateWishlistDto.name && updateWishlistDto.name !== wishlist.name) {
      const existingWishlist = await this.wishlistRepository.findByNameAndOwner(
        updateWishlistDto.name,
        wishlist.owner.id
      );

      if (existingWishlist) {
        throw new ConflictException('Wishlist with this name already exists');
      }
    }

    const updatedWishlist = await this.wishlistRepository.update(id, updateWishlistDto);
    if (!updatedWishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
    return updatedWishlist;
  }

  async delete(id: string): Promise<void> {
    const wishlist = await this.wishlistRepository.findById(id);
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with ID ${id} not found`);
    }
    await this.wishlistRepository.delete(id);
  }
}
