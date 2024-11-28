import { PartialType } from '@nestjs/mapped-types';
import { CreateManufacturingStandartDto } from './create-manufacturing-standart.dto';

export class UpdateManufacturingStandartDto extends PartialType(
  CreateManufacturingStandartDto,
) {}
