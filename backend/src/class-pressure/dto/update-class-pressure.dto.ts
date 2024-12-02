import { PartialType } from '@nestjs/mapped-types';
import { CreateClassPressureDto } from './create-class-pressure.dto';

export class UpdateClassPressureDto extends PartialType(
  CreateClassPressureDto,
) {}
