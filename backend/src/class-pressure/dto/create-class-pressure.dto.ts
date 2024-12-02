import { IsString, Length } from 'class-validator';

export class CreateClassPressureDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
