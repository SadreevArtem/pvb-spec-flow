import { Length } from 'class-validator';
import { Construction } from 'src/constructions/entities/construction.entity';
import { ManufacturingStandart } from 'src/manufacturing-standarts/entities/manufacturing-standart.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ProductType } from 'src/product-types/entities/product-type.entity';
import { TemperatureRange } from 'src/temperature-ranges/entities/temperature-range.entity';
import { TightnessClass } from 'src/tightness-classes/entities/tightness-class.entity';
import { Drive, TypeZra, WorkEnvironment } from 'src/types';
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

  @Column({
    type: 'enum',
    enum: TypeZra,
    nullable: true,
  })
  typeZra: TypeZra;

  @Column({ nullable: true })
  typeOfOrgan: string; //Тип запорного органа

  @ManyToOne(() => Construction, (construction) => construction.items)
  construction: Construction; //Справочник конструкции

  @ManyToOne(
    () => ManufacturingStandart,
    (manufacturingStandart) => manufacturingStandart.items,
  )
  manufacturingStandart: ManufacturingStandart; //Справочник конструкции

  @Column({ nullable: true })
  diameter: string; // ДУ

  @Column({ nullable: true })
  classPressure: string; //Py

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

  @Column({ nullable: true })
  housingMaterial: string; //Материал корпуса

  @Column({ nullable: true })
  rodMaterial: string; //Материал штока

  @Column({ nullable: true })
  wedgeMaterial: string; //Материал клина

  @Column({ nullable: true })
  seatMaterial: string; //Материал седла

  @Column({ nullable: true })
  pipeMaterial: string; //Материал трубы

  @Column({ nullable: true })
  connectionType: string; //Справочник типа присоедениния

  @Column({ nullable: true })
  @Length(1, 200)
  temperature: string;

  @Column({ nullable: true })
  @Length(1, 200)
  constructionLength: string;

  @Column({ nullable: true })
  counterFlangesMaterial: string; //Материал ответных фланцев

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
