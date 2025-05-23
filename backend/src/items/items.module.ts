import { forwardRef, Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductTypesModule } from 'src/product-types/product-types.module';
import { ConstructionsModule } from 'src/constructions/constructions.module';
import { ManufacturingStandartsModule } from 'src/manufacturing-standarts/manufacturing-standarts.module';
import { TightnessClassesModule } from 'src/tightness-classes/tightness-classes.module';
import { TemperatureRangesModule } from 'src/temperature-ranges/temperature-ranges.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    forwardRef(() => OrdersModule),
    ProductTypesModule,
    ConstructionsModule,
    ManufacturingStandartsModule,
    TightnessClassesModule,
    TemperatureRangesModule,
    ConstructionsModule,
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
