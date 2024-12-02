import { Module } from '@nestjs/common';
import { ClassPressureService } from './class-pressure.service';
import { ClassPressureController } from './class-pressure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassPressure } from './entities/class-pressure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassPressure])],
  providers: [ClassPressureService],
  controllers: [ClassPressureController],
  exports: [ClassPressureService],
})
export class ClassPressureModule {}
