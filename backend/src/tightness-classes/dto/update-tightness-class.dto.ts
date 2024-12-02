import { PartialType } from '@nestjs/mapped-types';
import { CreateTightnessClassDto } from './create-tightness-class.dto';

export class UpdateTightnessClassDto extends PartialType(
  CreateTightnessClassDto,
) {}
