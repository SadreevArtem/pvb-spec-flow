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
import { ClassPressureService } from './class-pressure.service';
import { CreateClassPressureDto } from './dto/create-class-pressure.dto';
import { UpdateClassPressureDto } from './dto/update-class-pressure.dto';

@Controller('class-pressure')
export class ClassPressureController {
  constructor(private readonly classPressureService: ClassPressureService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createClassPressureDto: CreateClassPressureDto) {
    return this.classPressureService.create(createClassPressureDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.classPressureService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getClassPressureById(@Param('id') id: string) {
    return this.classPressureService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClassPressureDto: UpdateClassPressureDto,
  ) {
    return this.classPressureService.update(id, updateClassPressureDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.classPressureService.remove(id, user);
  }
}
