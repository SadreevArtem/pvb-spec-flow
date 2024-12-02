import { Module } from '@nestjs/common';
import { TightnessClassesService } from './tightness-classes.service';
import { TightnessClassesController } from './tightness-classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TightnessClass } from './entities/tightness-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TightnessClass])],
  providers: [TightnessClassesService],
  controllers: [TightnessClassesController],
  exports: [TightnessClassesService],
})
export class TightnessClassesModule {}
