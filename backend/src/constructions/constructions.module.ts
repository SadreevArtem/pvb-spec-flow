import { Module } from '@nestjs/common';
import { ConstructionsService } from './constructions.service';
import { ConstructionsController } from './constructions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Construction } from './entities/construction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Construction])],
  providers: [ConstructionsService],
  controllers: [ConstructionsController],
  exports: [ConstructionsService],
})
export class ConstructionsModule {}
