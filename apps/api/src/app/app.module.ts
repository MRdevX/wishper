import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { WishesModule } from './wishes/wishes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoreModule, UsersModule, WishlistsModule, WishesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
