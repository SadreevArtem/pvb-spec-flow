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
import { ConstructionsService } from './constructions.service';
import { CreateConstructionDto } from './dto/create-construction.dto';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';
import { UpdateConstructionDto } from './dto/update-construction.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('constructions')
export class ConstructionsController {
  constructor(private readonly constructionService: ConstructionsService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createConstructionDto: CreateConstructionDto) {
    return this.constructionService.create(createConstructionDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.constructionService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getConstructionById(@Param('id') id: string) {
    return this.constructionService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConstructionDto: UpdateConstructionDto,
  ) {
    return this.constructionService.update(id, updateConstructionDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.constructionService.remove(id, user);
  }
}
