import { Length } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { ProductType } from 'src/product-types/entities/product-type.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 200)
  tagNumber: string;

  @Column()
  @Length(2, 200)
  techTaskNumber: string;

  @ManyToOne(() => ProductType, (productType) => productType.items)
  productType: ProductType; // Вид оборудования

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order; // Связь с заказом
}
