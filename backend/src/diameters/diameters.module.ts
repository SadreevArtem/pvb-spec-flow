import { Module } from '@nestjs/common';
import { DiametersService } from './diameters.service';
import { DiametersController } from './diameters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diameter } from './entities/diameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diameter])],
  providers: [DiametersService],
  controllers: [DiametersController],
  exports: [DiametersService],
})
export class DiametersModule {}
