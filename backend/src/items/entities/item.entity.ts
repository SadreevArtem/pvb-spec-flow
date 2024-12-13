import { Length } from 'class-validator';
import { ClassPressure } from 'src/class-pressure/entities/class-pressure.entity';
import { ConnectionType } from 'src/connection-types/entities/connection-type.entity';
import { Construction } from 'src/constructions/entities/construction.entity';
import { Diameter } from 'src/diameters/entities/diameter.entity';
import { ManufacturingStandart } from 'src/manufacturing-standarts/entities/manufacturing-standart.entity';
import { Material } from 'src/materials/entities/material.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ProductType } from 'src/product-types/entities/product-type.entity';
import { TemperatureRange } from 'src/temperature-ranges/entities/temperature-range.entity';
import { TightnessClass } from 'src/tightness-classes/entities/tightness-class.entity';
import { Drive, WorkEnvironment } from 'src/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'GVT' })
  @Length(1, 200)
  tagNumber: string;

  @Column({ nullable: true })
  techTaskNumber: string;

  @ManyToOne(() => ProductType, (productType) => productType.items)
  productType: ProductType; // Справочник типа оборудования

  @ManyToOne(() => Construction, (construction) => construction.items)
  construction: Construction; //Справочник конструкции

  @ManyToOne(
    () => ManufacturingStandart,
    (manufacturingStandart) => manufacturingStandart.items,
  )
  manufacturingStandart: ManufacturingStandart; //Справочник конструкции

  @ManyToOne(() => Diameter, (diameter) => diameter.items)
  diameter: Diameter; //Справочник ДУ

  @ManyToOne(() => ClassPressure, (classPressure) => classPressure.items)
  classPressure: ClassPressure; //Справочник Py

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order; // Связь с заказом

  @Column({
    type: 'enum',
    enum: WorkEnvironment,
    default: WorkEnvironment.LIQUID, // рабочая среда по умолчанию
  })
  workEnvironment: WorkEnvironment;

  @ManyToOne(() => TightnessClass, (tightnessClass) => tightnessClass.items)
  tightnessClass: TightnessClass; //Справочник класса герметичности

  @ManyToOne(
    () => TemperatureRange,
    (temperatureRange) => temperatureRange.items,
  )
  temperatureRange: TemperatureRange; //Справочник температурного диапазона

  @ManyToOne(() => Material, (material) => material.items)
  housingMaterial: Material; //Материал корпуса

  @ManyToOne(() => Material, (material) => material.items)
  rodMaterial: Material; //Материал штока

  @ManyToOne(() => Material, (material) => material.items)
  wedgeMaterial: Material; //Материал клина

  @ManyToOne(() => Material, (material) => material.items)
  seatMaterial: Material; //Материал седла

  @ManyToOne(() => Material, (material) => material.items)
  pipeMaterial: Material; //Материал трубы

  @ManyToOne(() => ConnectionType, (connectionType) => connectionType.items)
  connectionType: ConnectionType; //Справочник типа присоедениния

  @Column({ nullable: true })
  @Length(1, 200)
  temperature: string;

  @Column({ nullable: true })
  @Length(1, 200)
  constructionLength: string;

  @Column({ default: false })
  nace: boolean;

  @Column({ default: false })
  counterFlanges: boolean;

  @ManyToOne(() => Material, (material) => material.items)
  counterFlangesMaterial: Material; //Материал ответных фланцев

  @Column({ nullable: true })
  @Length(1, 200)
  hairpins: string;

  @Column({ nullable: true })
  @Length(1, 200)
  nuts: string;

  @Column({ nullable: true })
  @Length(1, 200)
  pipeSize: string;

  @Column({
    type: 'enum',
    enum: Drive,
    default: Drive.MANUAL, // привод по умолчанию
  })
  drive: Drive;

  @Column({ nullable: true })
  driveKit: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  @Length(1, 200)
  count: number;
}
