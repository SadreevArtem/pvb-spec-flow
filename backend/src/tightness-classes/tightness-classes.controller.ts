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
import { TightnessClassesService } from './tightness-classes.service';
import { CreateTightnessClassDto } from './dto/create-tightness-class.dto';
import { UpdateTightnessClassDto } from './dto/update-tightness-class.dto';

@Controller('tightness-classes')
export class TightnessClassesController {
  constructor(
    private readonly tightnessClassService: TightnessClassesService,
  ) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createTightnessClassDto: CreateTightnessClassDto) {
    return this.tightnessClassService.create(createTightnessClassDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.tightnessClassService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getTightnessClassById(@Param('id') id: string) {
    return this.tightnessClassService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTightnessClassDto: UpdateTightnessClassDto,
  ) {
    return this.tightnessClassService.update(id, updateTightnessClassDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.tightnessClassService.remove(id, user);
  }
}
