import { IsString, Length } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
