import { Length } from 'class-validator';
import { Item } from 'src/items/entities/item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ManufacturingStandart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 200)
  name: string;

  @OneToMany(() => Item, (item) => item.manufacturingStandart)
  items: Item[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}