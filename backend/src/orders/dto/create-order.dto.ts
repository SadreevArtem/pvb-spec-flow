import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @Length(2, 200)
  contractNumber: string;

  @IsNotEmpty()
  @Length(2, 200)
  complectName: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsNotEmpty()
  customerId: number;
  @IsNotEmpty()
  equipmentTypeId: number;
  @IsOptional()
  ownerId: number; // связь с пользователем, который является владельцем заказа
}
