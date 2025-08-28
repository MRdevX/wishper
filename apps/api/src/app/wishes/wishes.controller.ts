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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
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
    return this.wishesService.createWish(createWishDto, userId);
  }

  @Get()
  async findAll(
    @CurrentUser() user: any,
    @Query('ownerId') ownerId?: string,
    @Query('wishlistId') wishlistId?: string
  ) {
    if (ownerId) {
      return this.wishesService.findByOwner(ownerId);
    }
    if (wishlistId) {
      return this.wishesService.findByWishlist(wishlistId);
    }
    return this.wishesService.findByOwner(user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    const wish = await this.wishesService.findWithRelations(id);
    if (wish.owner?.id !== user.userId) {
      throw new ForbiddenException('Access denied');
    }
    return wish;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @CurrentUser() user: any
  ) {
    const existingWish = await this.wishesService.findById(id);
    if (existingWish.owner?.id !== user.userId) {
      throw new ForbiddenException('Access denied');
    }
    return this.wishesService.updateWish(id, updateWishDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    const existingWish = await this.wishesService.findById(id);
    if (existingWish.owner?.id !== user.userId) {
      throw new ForbiddenException('Access denied');
    }
    await this.wishesService.delete(id);
  }
}
