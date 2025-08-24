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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createWishDto: CreateWishDto, @Query('ownerId') ownerId: string) {
    const wish = await this.wishesService.create(createWishDto, ownerId);
    return ApiResponseDto.success(wish, 'Wish created successfully');
  }

  @Get()
  async findAll(@Query('ownerId') ownerId?: string, @Query('wishlistId') wishlistId?: string) {
    if (ownerId) {
      const wishes = await this.wishesService.findByOwner(ownerId);
      return ApiResponseDto.success(wishes);
    }
    if (wishlistId) {
      const wishes = await this.wishesService.findByWishlist(wishlistId);
      return ApiResponseDto.success(wishes);
    }
    const wishes = await this.wishesService.findAll();
    return ApiResponseDto.success(wishes);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wish = await this.wishesService.findWithRelations(id);
    if (!wish) {
      return ApiResponseDto.error('Wish not found');
    }
    return ApiResponseDto.success(wish);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    const wish = await this.wishesService.update(id, updateWishDto);
    return ApiResponseDto.success(wish, 'Wish updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.wishesService.delete(id);
  }
}
