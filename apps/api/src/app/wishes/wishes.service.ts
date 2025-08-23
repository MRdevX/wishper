import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { BaseRepository } from '../core/base/base.repositorty';

@Injectable()
export class WishesService extends BaseRepository<Wish> {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
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

  async findByIdWithRelations(id: string): Promise<Wish | null> {
    return this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'wishlist'],
    });
  }

  async createWish(
    createWishDto: CreateWishDto,
    ownerId: string,
  ): Promise<Wish> {
    const wishData: any = {
      ...createWishDto,
      owner: { id: ownerId } as any,
    };

    if (createWishDto.wishlistId) {
      wishData.wishlist = { id: createWishDto.wishlistId } as any;
    }

    return super.create(wishData);
  }

  async update(id: string, updateWishDto: UpdateWishDto): Promise<Wish> {
    const wish = await this.findById(id);
    if (!wish) {
      throw new NotFoundException(`Wish with ID ${id} not found`);
    }

    const updateData: any = { ...updateWishDto };
    if (updateWishDto.wishlistId) {
      updateData.wishlist = { id: updateWishDto.wishlistId } as any;
    }

    const updatedWish = await super.update(id, updateData);
    if (!updatedWish) {
      throw new NotFoundException(`Wish with ID ${id} not found`);
    }
    return updatedWish;
  }
}
