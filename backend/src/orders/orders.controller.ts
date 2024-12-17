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
import { OrdersService } from './orders.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ExcelServiceService } from 'src/excel-service/excel-service.service';
import * as path from 'path';
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly excelService: ExcelServiceService,
  ) {}
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @AuthUser() user: User) {
    return this.ordersService.create(createOrderDto, user.id);
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.ordersService.remove(id, user);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }
  @UseGuards(JwtGuard)
  @Post(':id/generate-excel')
  async generateOrderExcel(
    @Param('id') id: string,
  ): Promise<{ filePath: string }> {
    const order = await this.ordersService.findById(+id); // Получаем заказ по ID
    if (!order) {
      throw new Error('Order not found');
    }

    // Путь к шаблону и выходной папке
    const templatePath = path.join(__dirname, '../templates/Order.xlsx');
    const outputDir = path.join(__dirname, '..', 'uploads');

    // Генерация нового файла Excel
    const { excelPath, pdfPath } =
      await this.excelService.generateExcelFromTemplate(
        templatePath,
        outputDir,
        order,
      );

    // Сохранение пути к файлу в сущность
    order.filePath = excelPath;
    await this.ordersService.update(+id, {
      filePath: excelPath,
      filePathPdf: pdfPath,
    });

    return { filePath: excelPath };
  }
}
