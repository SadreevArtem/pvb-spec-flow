import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { ProductTypesService } from 'src/product-types/product-types.service';
import { ConstructionsService } from 'src/constructions/constructions.service';
import { TightnessClassesService } from 'src/tightness-classes/tightness-classes.service';
import { TemperatureRangesService } from 'src/temperature-ranges/temperature-ranges.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly ordersService: OrdersService,
    private readonly productTypeService: ProductTypesService,
    private readonly constructionsService: ConstructionsService,
    private readonly tightnessClassesService: TightnessClassesService,
    private readonly temperatureRangesService: TemperatureRangesService,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const {
      orderId,
      productTypeId,
      constructionId,
      classPressure,
      typeZra,
      tightnessClassId,
      temperatureRangeId,
      housingMaterial,
      connectionType,
      rodMaterial,
      seatMaterial,
      pipeMaterial,
      wedgeMaterial,
      diameter,
      counterFlangesMaterial,
      ...itemData
    } = createItemDto;

    const order = await this.ordersService.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const productType = await this.productTypeService.findById(productTypeId);
    if (!order) {
      throw new NotFoundException('Product type not found');
    }
    const construction =
      await this.constructionsService.findById(constructionId);
    if (!construction) {
      throw new NotFoundException('Construction not found');
    }
    const tightnessClass =
      await this.tightnessClassesService.findById(tightnessClassId);
    if (!tightnessClass) {
      throw new NotFoundException('DN not found');
    }
    const temperatureRange =
      await this.temperatureRangesService.findById(temperatureRangeId);
    if (!temperatureRange) {
      throw new NotFoundException('DN not found');
    }
    const item = this.itemsRepository.create({
      ...itemData,
      order,
      productType,
      construction,
      diameter,
      typeZra,
      tightnessClass,
      classPressure,
      temperatureRange,
      housingMaterial,
      connectionType,
      rodMaterial,
      seatMaterial,
      wedgeMaterial,
      pipeMaterial,
      counterFlangesMaterial,
    });

    return this.itemsRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemsRepository.findOne({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Complect with id ${id} not found`);
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const {
      orderId,
      productTypeId,
      diameter,
      classPressure,
      constructionId,
      tightnessClassId,
      temperatureRangeId,
      housingMaterial,
      connectionType,
      rodMaterial,
      seatMaterial,
      typeZra,
      pipeMaterial,
      wedgeMaterial,
      counterFlangesMaterial,
      ...itemData
    } = updateItemDto;
    const order = await this.ordersService.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const productType = await this.productTypeService.findById(productTypeId);
    if (!order) {
      throw new NotFoundException('Product type not found');
    }
    const construction =
      await this.constructionsService.findById(constructionId);
    if (!construction) {
      throw new NotFoundException('Construction not found');
    }
    const tightnessClass =
      await this.tightnessClassesService.findById(tightnessClassId);
    if (!tightnessClass) {
      throw new NotFoundException('DN not found');
    }
    const temperatureRange =
      await this.temperatureRangesService.findById(temperatureRangeId);
    if (!temperatureRange) {
      throw new NotFoundException('DN not found');
    }
    return this.itemsRepository.update(id, {
      ...itemData,
      order,
      productType,
      construction,
      diameter,
      typeZra,
      classPressure,
      tightnessClass,
      temperatureRange,
      housingMaterial,
      connectionType,
      rodMaterial,
      seatMaterial,
      pipeMaterial,
      wedgeMaterial,
      counterFlangesMaterial,
    });
  }

  async remove(id: number, user: User): Promise<Item> {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Недостаточно прав для удаления позиции');
    }
    const item = await this.findOne(id);
    return await this.itemsRepository.remove(item);
  }
}
