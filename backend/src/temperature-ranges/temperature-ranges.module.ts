import { Module } from '@nestjs/common';
import { TemperatureRangesService } from './temperature-ranges.service';
import { TemperatureRangesController } from './temperature-ranges.controller';
import { TemperatureRange } from './entities/temperature-range.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TemperatureRange])],
  providers: [TemperatureRangesService],
  controllers: [TemperatureRangesController],
  exports: [TemperatureRangesService],
})
export class TemperatureRangesModule {}
