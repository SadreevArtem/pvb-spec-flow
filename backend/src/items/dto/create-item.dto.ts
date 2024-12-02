import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { WorkEnvironment } from 'src/types';

export class CreateItemDto {
  @IsNumber()
  orderId: number; // Связь с заказом через его ID

  @IsString()
  @Length(1, 200)
  tagNumber: string;

  @IsString()
  @Length(2, 200)
  techTaskNumber: string;

  @IsNotEmpty()
  productTypeId: number;

  @IsNotEmpty()
  constructionId: number;

  @IsNotEmpty()
  manufacturingStandartId: number;

  @IsNotEmpty()
  diameterId: number;

  @IsNotEmpty()
  classPressureId: number;

  @IsEnum(WorkEnvironment)
  @IsOptional()
  workEnvironment?: WorkEnvironment;

  @IsString()
  @Length(1, 200)
  temperature: string;
}
