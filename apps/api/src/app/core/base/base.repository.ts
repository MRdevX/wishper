import {
  Repository,
  FindManyOptions,
  DeepPartial,
  FindOptionsWhere,
  FindOptionsOrder,
} from 'typeorm';
import { BaseModel } from './base.entity';

export interface PaginationOptions<T> {
  skip?: number;
  take?: number;
  order?: FindOptionsOrder<T>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  skip: number;
  take: number;
  hasMore: boolean;
}

export abstract class BaseRepository<T extends BaseModel> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    const savedEntity = await this.repository.save(entity);
    return Array.isArray(savedEntity) ? savedEntity[0] : savedEntity;
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as FindOptionsWhere<T> });
  }

  async findByIdWithRelations(id: string, relations: string[] = []): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations,
    });
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findMany(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.repository.find({ where });
  }

  async findWithPagination(
    where: FindOptionsWhere<T> = {},
    options: PaginationOptions<T> = {}
  ): Promise<PaginatedResult<T>> {
    const { skip = 0, take = 10, order = { createdAt: 'DESC' } as FindOptionsOrder<T> } = options;

    const [data, total] = await this.repository.findAndCount({
      where,
      skip,
      take,
      order,
    });

    return {
      data,
      total,
      skip,
      take,
      hasMore: skip + take < total,
    };
  }

  async count(where: FindOptionsWhere<T> = {}): Promise<number> {
    return this.repository.count({ where });
  }

  async exists(where: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.repository.count({ where });
    return count > 0;
  }

  async update(id: string, data: any): Promise<T | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return (result.affected || 0) > 0;
  }

  async hardDelete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected || 0) > 0;
  }

  async restore(id: string): Promise<boolean> {
    const result = await this.repository.restore(id);
    return (result.affected || 0) > 0;
  }
}
