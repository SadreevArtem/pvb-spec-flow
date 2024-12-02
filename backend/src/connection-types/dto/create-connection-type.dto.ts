import { IsString, Length } from 'class-validator';

export class CreateConnectionTypeDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
