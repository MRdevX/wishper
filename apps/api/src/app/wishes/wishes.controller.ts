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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RequireOwnership } from '../auth/decorators/require-permission.decorator';

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
  @RequireOwnership()
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.wishesService.findWithRelations(id);
  }

  @Patch(':id')
  @RequireOwnership()
  async update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @CurrentUser() user: any
  ) {
    return this.wishesService.updateWish(id, updateWishDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @RequireOwnership()
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.wishesService.delete(id);
  }
}
