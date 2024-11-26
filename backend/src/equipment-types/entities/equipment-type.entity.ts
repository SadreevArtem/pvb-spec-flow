import { Length } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EquipmentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 200)
  name: string;

  @OneToMany(() => Order, (order) => order.equipmentType)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
