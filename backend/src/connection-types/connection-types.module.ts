import { Module } from '@nestjs/common';
import { ConnectionTypesService } from './connection-types.service';
import { ConnectionTypesController } from './connection-types.controller';
import { ConnectionType } from './entities/connection-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionType])],
  providers: [ConnectionTypesService],
  controllers: [ConnectionTypesController],
  exports: [ConnectionTypesService],
})
export class ConnectionTypesModule {}
