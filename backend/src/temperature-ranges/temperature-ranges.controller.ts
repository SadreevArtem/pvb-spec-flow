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
import { TemperatureRangesService } from './temperature-ranges.service';
import { CreateTemperatureRangeDto } from './dto/create-temperature-range.dto';
import { UpdateTemperatureRangeDto } from './dto/update-temperature-range.dto';

@Controller('temperature-ranges')
export class TemperatureRangesController {
  constructor(
    private readonly temperatureRangeService: TemperatureRangesService,
  ) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createTemperatureRangeDto: CreateTemperatureRangeDto) {
    return this.temperatureRangeService.create(createTemperatureRangeDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.temperatureRangeService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getTemperatureRangeById(@Param('id') id: string) {
    return this.temperatureRangeService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTemperatureRangeDto: UpdateTemperatureRangeDto,
  ) {
    return this.temperatureRangeService.update(id, updateTemperatureRangeDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.temperatureRangeService.remove(id, user);
  }
}
