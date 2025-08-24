import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<User | null> {
    await this.userRepository.updatePassword(userId, hashedPassword);
    return this.findById(userId);
  }
}
