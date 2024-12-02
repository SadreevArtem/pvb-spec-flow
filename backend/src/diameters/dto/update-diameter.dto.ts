import { PartialType } from '@nestjs/mapped-types';
import { CreateDiameterDto } from './create-diameter.dto';

export class UpdateDiameterDto extends PartialType(CreateDiameterDto) {}
