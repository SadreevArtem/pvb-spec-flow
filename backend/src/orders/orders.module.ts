import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { CustomersModule } from 'src/customers/customers.module';
import { ItemsModule } from 'src/items/items.module';
import { EquipmentTypesModule } from 'src/equipment-types/equipment-types.module';
import { ExcelServiceModule } from 'src/excel-service/excel-service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    CustomersModule,
    EquipmentTypesModule,
    ExcelServiceModule,
    forwardRef(() => ItemsModule),
  ],
  exports: [OrdersService],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
