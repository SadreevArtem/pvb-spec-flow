import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateItemDto {
  @IsNumber()
  orderId: number; // Связь с заказом через его ID

  @IsString()
  @Length(2, 200)
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
}
