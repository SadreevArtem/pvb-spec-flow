import { PartialType } from '@nestjs/mapped-types';
import { CreateConnectionTypeDto } from './create-connection-type.dto';

export class UpdateConnectionTypeDto extends PartialType(
  CreateConnectionTypeDto,
) {}
