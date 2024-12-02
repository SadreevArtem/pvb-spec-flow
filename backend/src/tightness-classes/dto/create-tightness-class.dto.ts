import { IsString, Length } from 'class-validator';

export class CreateTightnessClassDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
