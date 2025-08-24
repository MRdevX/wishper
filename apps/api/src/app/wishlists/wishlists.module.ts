import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistRepository } from './repositories/wishlist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService, WishlistRepository],
  exports: [WishlistsService],
})
export class WishlistsModule {}
