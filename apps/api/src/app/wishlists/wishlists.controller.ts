import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RequireOwnership } from '../auth/decorators/require-permission.decorator';

@Controller('wishlists')
@UseGuards(JwtAuthGuard)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
    @CurrentUser() user: any,
    @Query('ownerId') ownerId?: string
  ) {
    const userId = ownerId || user.userId;
    return this.wishlistsService.createWishlist(createWishlistDto, userId);
  }

  @Get()
  async findAll(@CurrentUser() user: any, @Query('ownerId') ownerId?: string) {
    if (ownerId) {
      return this.wishlistsService.findByOwner(ownerId);
    }
    return this.wishlistsService.findByOwner(user.userId);
  }

  @Get(':id')
  @RequireOwnership()
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.wishlistsService.findWithWishes(id);
  }

  @Patch(':id')
  @RequireOwnership()
  async update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @CurrentUser() user: any
  ) {
    return this.wishlistsService.updateWishlist(id, updateWishlistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @RequireOwnership()
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.wishlistsService.delete(id);
  }
}
