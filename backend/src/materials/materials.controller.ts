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
import { JwtGuard } from 'src/guard/jwt.guard';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialService: MaterialsService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.materialService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getMaterialById(@Param('id') id: string) {
    return this.materialService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, updateMaterialDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.materialService.remove(id, user);
  }
}
