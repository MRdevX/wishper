import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { Wish } from './entities/wish.entity';
import { WishRepository } from './repositories/wish.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService, WishRepository],
  exports: [WishesService],
})
export class WishesModule {}
