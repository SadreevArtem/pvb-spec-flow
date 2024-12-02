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
import { DiametersService } from './diameters.service';
import { CreateDiameterDto } from './dto/create-diameter.dto';
import { UpdateDiameterDto } from './dto/update-diameter.dto';

@Controller('diameters')
export class DiametersController {
  constructor(private readonly diameterService: DiametersService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createDiameterDto: CreateDiameterDto) {
    return this.diameterService.create(createDiameterDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.diameterService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getDiameterById(@Param('id') id: string) {
    return this.diameterService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDiameterDto: UpdateDiameterDto,
  ) {
    return this.diameterService.update(id, updateDiameterDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.diameterService.remove(id, user);
  }
}
