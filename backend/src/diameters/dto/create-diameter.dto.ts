import { IsString, Length } from 'class-validator';

export class CreateDiameterDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
