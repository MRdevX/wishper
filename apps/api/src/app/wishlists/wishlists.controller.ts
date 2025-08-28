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
  ForbiddenException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

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
    return this.wishlistsService.create(createWishlistDto, userId);
  }

  @Get()
  async findAll(@CurrentUser() user: any, @Query('ownerId') ownerId?: string) {
    if (ownerId) {
      return this.wishlistsService.findByOwner(ownerId);
    }
    return this.wishlistsService.findByOwner(user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    const wishlist = await this.wishlistsService.findWithWishes(id);
    if (wishlist.owner?.id !== user.userId) {
      throw new ForbiddenException('Access denied');
    }
    return wishlist;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @CurrentUser() user: any
  ) {
    const existingWishlist = await this.wishlistsService.findById(id);
    if (existingWishlist.owner?.id !== user.userId) {
      throw new ForbiddenException('Access denied');
    }
    return this.wishlistsService.update(id, updateWishlistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    const existingWishlist = await this.wishlistsService.findById(id);
    if (existingWishlist.owner?.id !== user.userId) {
      throw new ForbiddenException('Access denied');
    }
    await this.wishlistsService.delete(id);
  }
}
