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
import { ConnectionTypesService } from './connection-types.service';
import { CreateConnectionTypeDto } from './dto/create-connection-type.dto';
import { UpdateConnectionTypeDto } from './dto/update-connection-type.dto';

@Controller('connection-types')
export class ConnectionTypesController {
  constructor(private readonly connectionTypeService: ConnectionTypesService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createConnectionTypeDto: CreateConnectionTypeDto) {
    return this.connectionTypeService.create(createConnectionTypeDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.connectionTypeService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getConnectionTypeById(@Param('id') id: string) {
    return this.connectionTypeService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConnectionTypeDto: UpdateConnectionTypeDto,
  ) {
    return this.connectionTypeService.update(id, updateConnectionTypeDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.connectionTypeService.remove(id, user);
  }
}
