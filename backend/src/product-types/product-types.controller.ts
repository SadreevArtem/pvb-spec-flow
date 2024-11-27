import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly equipmentTypeService: ProductTypesService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.equipmentTypeService.create(createProductTypeDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.equipmentTypeService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getProductTypeById(@Param('id') id: string) {
    return this.equipmentTypeService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    return this.equipmentTypeService.update(id, updateProductTypeDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.equipmentTypeService.remove(id, user);
  }
}
