import { PartialType } from '@nestjs/mapped-types';
import { CreateTemperatureRangeDto } from './create-temperature-range.dto';

export class UpdateTemperatureRangeDto extends PartialType(
  CreateTemperatureRangeDto,
) {}
