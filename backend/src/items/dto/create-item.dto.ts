import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Drive, WorkEnvironment } from 'src/types';

export class CreateItemDto {
  @IsNumber()
  orderId: number; // Связь с заказом через его ID

  @IsString()
  @Length(1, 200)
  tagNumber: string;

  @IsOptional()
  @IsString()
  techTaskNumber: string;

  @IsOptional()
  productTypeId: number;

  @IsOptional()
  constructionId: number;

  @IsOptional()
  manufacturingStandartId: number;

  @IsOptional()
  typeOfOrgan: string;

  @IsOptional()
  diameter: string;

  @IsOptional()
  classPressure: string;

  @IsEnum(WorkEnvironment)
  @IsOptional()
  workEnvironment?: WorkEnvironment;

  @IsOptional()
  @IsString()
  temperature: string;

  @IsOptional()
  tightnessClassId: number;

  @IsOptional()
  temperatureRangeId: number;

  @IsOptional()
  housingMaterial: string;

  @IsOptional()
  rodMaterial: string;

  @IsOptional()
  seatMaterial: string;

  @IsOptional()
  wedgeMaterial: string;

  @IsOptional()
  counterFlangesMaterial: string;

  @IsOptional()
  pipeMaterial: string;

  @IsOptional()
  connectionType: string;

  @IsOptional()
  constructionLength: string;

  @IsOptional()
  @IsString()
  hairpins: string;

  @IsOptional()
  @IsString()
  nuts: string;

  @IsOptional()
  @IsString()
  pipeSize: string;

  @IsEnum(Drive)
  @IsOptional()
  drive?: Drive;

  @IsString()
  @IsOptional()
  driveKit: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsNumber()
  @IsOptional()
  count: number;
}
