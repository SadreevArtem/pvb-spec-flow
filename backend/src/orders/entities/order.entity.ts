import { Length } from 'class-validator';
import { Customer } from 'src/customers/entities/customer.entity';
import { EquipmentType } from 'src/equipment-types/entities/equipment-type.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 200)
  contractNumber: string;

  @Column()
  count: number;

  @Column()
  @Length(2, 200)
  complectName: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer; // заказчик

  @ManyToOne(() => User, (user) => user.orders)
  owner: User; // связь с пользователем, который является владельцем заказа

  @OneToMany(() => Item, (item) => item.order, { cascade: true })
  items: Item[]; // Связь с массивом комплектов

  @ManyToOne(() => EquipmentType, (equipmentType) => equipmentType.orders)
  equipmentType: EquipmentType; // Вид оборудования

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
