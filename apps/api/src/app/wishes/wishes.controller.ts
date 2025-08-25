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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('wishes')
@UseGuards(JwtAuthGuard)
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createWishDto: CreateWishDto,
    @CurrentUser() user: any,
    @Query('ownerId') ownerId?: string
  ) {
    const userId = ownerId || user.userId;
    const wish = await this.wishesService.create(createWishDto, userId);
    return ApiResponseDto.success(wish, 'Wish created successfully');
  }

  @Get()
  async findAll(
    @CurrentUser() user: any,
    @Query('ownerId') ownerId?: string,
    @Query('wishlistId') wishlistId?: string
  ) {
    if (ownerId) {
      const wishes = await this.wishesService.findByOwner(ownerId);
      return ApiResponseDto.success(wishes);
    }
    if (wishlistId) {
      const wishes = await this.wishesService.findByWishlist(wishlistId);
      return ApiResponseDto.success(wishes);
    }

    const wishes = await this.wishesService.findByOwner(user.userId);
    return ApiResponseDto.success(wishes);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    const wish = await this.wishesService.findWithRelations(id);
    if (!wish) {
      return ApiResponseDto.error('Wish not found');
    }

    if (wish.owner?.id !== user.userId) {
      return ApiResponseDto.error('Access denied');
    }
    return ApiResponseDto.success(wish);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @CurrentUser() user: any
  ) {
    const existingWish = await this.wishesService.findById(id);
    if (existingWish.owner?.id !== user.userId) {
      return ApiResponseDto.error('Access denied');
    }

    const wish = await this.wishesService.update(id, updateWishDto);
    return ApiResponseDto.success(wish, 'Wish updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    const existingWish = await this.wishesService.findById(id);
    if (existingWish.owner?.id !== user.userId) {
      return ApiResponseDto.error('Access denied');
    }

    await this.wishesService.delete(id);
    return ApiResponseDto.success(null, 'Wish deleted successfully');
  }
}
