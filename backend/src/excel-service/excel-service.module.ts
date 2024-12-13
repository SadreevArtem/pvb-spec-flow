import { Module } from '@nestjs/common';
import { ExcelServiceService } from './excel-service.service';

@Module({
  providers: [ExcelServiceService],
  exports: [ExcelServiceService],
})
export class ExcelServiceModule {}
