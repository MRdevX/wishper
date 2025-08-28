import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../core/base/base.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {
    super(userRepo);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password'],
    });
  }

  async findWithWishes(id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      relations: ['wishes'],
    });
  }

  async findWithWishlists(id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      relations: ['wishlists'],
    });
  }

  async findWithWishesAndWishlists(id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      relations: ['wishes', 'wishlists'],
    });
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<User | null> {
    await this.userRepo.update(userId, { password: hashedPassword });
    return this.findById(userId);
  }
}
