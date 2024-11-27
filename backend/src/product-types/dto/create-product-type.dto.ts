import { IsString, Length } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  @Length(2, 200)
  name: string;
  @IsString()
  @Length(2, 200)
  model: string;
}
