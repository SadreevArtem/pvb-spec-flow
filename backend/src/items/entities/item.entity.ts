import { Length } from 'class-validator';
import { Construction } from 'src/constructions/entities/construction.entity';
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
  productType: ProductType; // Справочник типа оборудования

  @ManyToOne(() => Construction, (construction) => construction.items)
  construction: Construction; //Справочник конструкции

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order; // Связь с заказом
}
