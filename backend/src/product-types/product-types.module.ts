import { Module } from '@nestjs/common';
import { ProductTypesController } from './product-types.controller';
import { ProductTypesService } from './product-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './entities/product-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  providers: [ProductTypesService],
  controllers: [ProductTypesController],
  exports: [ProductTypesService],
})
export class ProductTypesModule {}
