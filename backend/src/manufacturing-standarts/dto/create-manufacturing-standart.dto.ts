import { IsString, Length } from 'class-validator';

export class CreateManufacturingStandartDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
