import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { BaseService } from '../core/base/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    return this.userRepository.create(createUserDto);
  }

  async createWithPassword(email: string, hashedPassword: string, name?: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    return this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepository.findByEmailWithPassword(email);
  }

  async findWithWishes(id: string): Promise<User> {
    const user = await this.userRepository.findWithWishes(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findWithWishlists(id: string): Promise<User> {
    const user = await this.userRepository.findWithWishlists(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<User | null> {
    await this.userRepository.updatePassword(userId, hashedPassword);
    return this.findById(userId);
  }
}
