import { IsString, Length } from 'class-validator';

export class CreateTemperatureRangeDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
