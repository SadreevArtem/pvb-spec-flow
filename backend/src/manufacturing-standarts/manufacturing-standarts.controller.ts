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
import { ManufacturingStandartsService } from './manufacturing-standarts.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CreateManufacturingStandartDto } from './dto/create-manufacturing-standart.dto';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';
import { UpdateManufacturingStandartDto } from './dto/update-manufacturing-standart.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('manufacturing-standarts')
export class ManufacturingStandartsController {
  constructor(
    private readonly manufacturingStandartService: ManufacturingStandartsService,
  ) {}
  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createManufacturingStandartDto: CreateManufacturingStandartDto,
  ) {
    return this.manufacturingStandartService.create(
      createManufacturingStandartDto,
    );
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.manufacturingStandartService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getManufacturingStandartById(@Param('id') id: string) {
    return this.manufacturingStandartService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateManufacturingStandartDto: UpdateManufacturingStandartDto,
  ) {
    return this.manufacturingStandartService.update(
      id,
      updateManufacturingStandartDto,
    );
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.manufacturingStandartService.remove(id, user);
  }
}
