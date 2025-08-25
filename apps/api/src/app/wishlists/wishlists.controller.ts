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
import { ApiResponseDto } from '../common/dto/api-response.dto';
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
    const wishlist = await this.wishlistsService.create(createWishlistDto, userId);
    return ApiResponseDto.success(wishlist, 'Wishlist created successfully');
  }

  @Get()
  async findAll(@CurrentUser() user: any, @Query('ownerId') ownerId?: string) {
    if (ownerId) {
      const wishlists = await this.wishlistsService.findByOwner(ownerId);
      return ApiResponseDto.success(wishlists);
    }

    const wishlists = await this.wishlistsService.findByOwner(user.userId);
    return ApiResponseDto.success(wishlists);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    const wishlist = await this.wishlistsService.findWithWishes(id);
    if (!wishlist) {
      return ApiResponseDto.error('Wishlist not found');
    }

    if (wishlist.owner?.id !== user.userId) {
      return ApiResponseDto.error('Access denied');
    }
    return ApiResponseDto.success(wishlist);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @CurrentUser() user: any
  ) {
    const existingWishlist = await this.wishlistsService.findById(id);
    if (existingWishlist.owner?.id !== user.userId) {
      return ApiResponseDto.error('Access denied');
    }

    const wishlist = await this.wishlistsService.update(id, updateWishlistDto);
    return ApiResponseDto.success(wishlist, 'Wishlist updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    const existingWishlist = await this.wishlistsService.findById(id);
    if (existingWishlist.owner?.id !== user.userId) {
      return ApiResponseDto.error('Access denied');
    }

    await this.wishlistsService.delete(id);
    return ApiResponseDto.success(null, 'Wishlist deleted successfully');
  }
}
