import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { BaseModel } from './base.entity';

@Injectable()
export abstract class BaseService<T extends BaseModel> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  async create(data: any): Promise<T> {
    return this.repository.create(data);
  }

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<T> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: string, data: any): Promise<T> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    const updatedEntity = await this.repository.update(id, data);
    if (!updatedEntity) {
      throw new NotFoundException(`Failed to update entity with ID ${id}`);
    }
    return updatedEntity;
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    try {
      const deleted = await this.repository.delete(id);
      if (!deleted) {
        throw new NotFoundException(`Failed to delete entity with ID ${id}`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete entity: ${error.message}`);
    }
  }
}
