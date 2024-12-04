import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
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

  @IsNotEmpty()
  tightnessClassId: number;

  @IsNotEmpty()
  temperatureRangeId: number;

  @IsNotEmpty()
  housingMaterialId: number;

  @IsNotEmpty()
  rodMaterialId: number;

  @IsNotEmpty()
  seatMaterialId: number;

  @IsNotEmpty()
  wedgeMaterialId: number;

  @IsNotEmpty()
  counterFlangesMaterialId: number;

  @IsNotEmpty()
  pipeMaterialId: number;

  @IsNotEmpty()
  connectionTypeId: number;

  @IsString()
  @Length(1, 200)
  constructionLength: string;

  @IsBoolean()
  nace: boolean;

  @IsBoolean()
  counterFlanges: boolean;

  @IsString()
  @Length(1, 200)
  hairpins: string;

  @IsString()
  @Length(1, 200)
  nuts: string;

  @IsString()
  @Length(1, 200)
  pipeSize: string;

  @IsEnum(Drive)
  @IsOptional()
  drive?: Drive;

  @IsString()
  driveKit: string;

  @IsString()
  comment: string;
}
