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
import { ManufacturingStandartsService } from 'src/manufacturing-standarts/manufacturing-standarts.service';
import { TightnessClassesService } from 'src/tightness-classes/tightness-classes.service';
import { TemperatureRangesService } from 'src/temperature-ranges/temperature-ranges.service';
import { MaterialsService } from 'src/materials/materials.service';
import { ConnectionTypesService } from 'src/connection-types/connection-types.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly ordersService: OrdersService,
    private readonly productTypeService: ProductTypesService,
    private readonly constructionsService: ConstructionsService,
    private readonly manufacturingStandartsService: ManufacturingStandartsService,
    private readonly tightnessClassesService: TightnessClassesService,
    private readonly temperatureRangesService: TemperatureRangesService,
    private readonly materialService: MaterialsService,
    private readonly connectionTypesService: ConnectionTypesService,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const {
      orderId,
      productTypeId,
      manufacturingStandartId,
      constructionId,
      classPressure,
      tightnessClassId,
      temperatureRangeId,
      housingMaterialId,
      connectionTypeId,
      rodMaterialId,
      seatMaterialId,
      pipeMaterialId,
      wedgeMaterialId,
      diameter,
      counterFlangesMaterialId,
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
    const manufacturingStandart =
      await this.manufacturingStandartsService.findById(
        manufacturingStandartId,
      );
    if (!manufacturingStandart) {
      throw new NotFoundException('Manufacturing Standart not found');
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
    const housingMaterial =
      await this.materialService.findById(housingMaterialId);
    if (!housingMaterial) {
      throw new NotFoundException('Housing Material not found');
    }
    const connectionType =
      await this.connectionTypesService.findById(connectionTypeId);
    if (!connectionType) {
      throw new NotFoundException('Connection type not found');
    }
    const rodMaterial = await this.materialService.findById(rodMaterialId);
    if (!rodMaterial) {
      throw new NotFoundException('Rod Material not found');
    }
    const seatMaterial = await this.materialService.findById(seatMaterialId);
    if (!seatMaterial) {
      throw new NotFoundException('Seat Material not found');
    }
    const counterFlangesMaterial = await this.materialService.findById(
      counterFlangesMaterialId,
    );
    if (!counterFlangesMaterial) {
      throw new NotFoundException('Counterflanges Material not found');
    }
    const pipeMaterial = await this.materialService.findById(pipeMaterialId);
    if (!pipeMaterial) {
      throw new NotFoundException('Pipe - Material not found');
    }
    const wedgeMaterial = await this.materialService.findById(wedgeMaterialId);
    if (!wedgeMaterial) {
      throw new NotFoundException('Wedge - Material not found');
    }
    const item = this.itemsRepository.create({
      ...itemData,
      order,
      productType,
      construction,
      manufacturingStandart,
      diameter,
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
      manufacturingStandartId,
      diameter,
      classPressure,
      constructionId,
      tightnessClassId,
      temperatureRangeId,
      housingMaterialId,
      connectionTypeId,
      rodMaterialId,
      seatMaterialId,
      pipeMaterialId,
      wedgeMaterialId,
      counterFlangesMaterialId,
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
    const manufacturingStandart =
      await this.manufacturingStandartsService.findById(
        manufacturingStandartId,
      );
    if (!manufacturingStandart) {
      throw new NotFoundException('Manufacturing Standart not found');
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
    const housingMaterial =
      await this.materialService.findById(housingMaterialId);
    if (!housingMaterial) {
      throw new NotFoundException('Housing Material not found');
    }
    const connectionType =
      await this.connectionTypesService.findById(connectionTypeId);
    if (!connectionType) {
      throw new NotFoundException('Connection type not found');
    }
    const rodMaterial = await this.materialService.findById(rodMaterialId);
    if (!rodMaterial) {
      throw new NotFoundException('Rod Material not found');
    }
    const seatMaterial = await this.materialService.findById(seatMaterialId);
    if (!seatMaterial) {
      throw new NotFoundException('Seat Material not found');
    }
    const counterFlangesMaterial = await this.materialService.findById(
      counterFlangesMaterialId,
    );
    if (!counterFlangesMaterial) {
      throw new NotFoundException('Counterflanges Material not found');
    }
    const pipeMaterial = await this.materialService.findById(pipeMaterialId);
    if (!pipeMaterial) {
      throw new NotFoundException('Pipe - Material not found');
    }
    const wedgeMaterial = await this.materialService.findById(wedgeMaterialId);
    if (!wedgeMaterial) {
      throw new NotFoundException('Wedge - Material not found');
    }
    return this.itemsRepository.update(id, {
      ...itemData,
      order,
      productType,
      construction,
      manufacturingStandart,
      diameter,
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
