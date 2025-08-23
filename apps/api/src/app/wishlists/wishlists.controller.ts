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
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createWishlistDto: CreateWishlistDto, @Query('ownerId') ownerId: string) {
    const wishlist = await this.wishlistsService.createWishlist(createWishlistDto, ownerId);
    return ApiResponseDto.success(wishlist, 'Wishlist created successfully');
  }

  @Get()
  async findAll(@Query('ownerId') ownerId?: string) {
    if (ownerId) {
      const wishlists = await this.wishlistsService.findByOwner(ownerId);
      return ApiResponseDto.success(wishlists);
    }
    const wishlists = await this.wishlistsService.findAll();
    return ApiResponseDto.success(wishlists);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wishlist = await this.wishlistsService.findByIdWithWishes(id);
    if (!wishlist) {
      return ApiResponseDto.error('Wishlist not found');
    }
    return ApiResponseDto.success(wishlist);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    const wishlist = await this.wishlistsService.update(id, updateWishlistDto);
    return ApiResponseDto.success(wishlist, 'Wishlist updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.wishlistsService.delete(id);
  }
}
