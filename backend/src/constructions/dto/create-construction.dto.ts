import { IsString, Length } from 'class-validator';

export class CreateConstructionDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
