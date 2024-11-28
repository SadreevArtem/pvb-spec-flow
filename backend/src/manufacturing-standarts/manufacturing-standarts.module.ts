import { Module } from '@nestjs/common';
import { ManufacturingStandartsService } from './manufacturing-standarts.service';
import { ManufacturingStandartsController } from './manufacturing-standarts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturingStandart } from './entities/manufacturing-standart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturingStandart])],
  providers: [ManufacturingStandartsService],
  controllers: [ManufacturingStandartsController],
  exports: [ManufacturingStandartsService],
})
export class ManufacturingStandartsModule {}
