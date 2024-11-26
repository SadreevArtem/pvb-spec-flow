import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { CustomersService } from 'src/customers/customers.service';
import { EquipmentTypesService } from 'src/equipment-types/equipment-types.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly equipmentTypeService: EquipmentTypesService,
  ) {}
  findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      order: { id: 'ASC' },
      relations: { owner: true, customer: true },
    });
  }
  findById(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        customer: true,
        items: true,
        equipmentType: true,
      },
    });
  }
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const {
      customerId,
      ownerId: userId,
      equipmentTypeId,
      ...rest
    } = updateOrderDto;
    // Получаем сущности для связи
    const owner = await this.usersService.findById(userId);
    const customer = await this.customersService.findById(customerId);
    const equipmentType =
      await this.equipmentTypeService.findById(equipmentTypeId);
    // Обновляем заказ, передавая только нужные поля из rest
    return this.orderRepository.update(id, {
      ...rest,
      owner,
      customer,
      equipmentType,
    });
  }
  async create(createOrderDto: CreateOrderDto, userId: number) {
    const { customerId, equipmentTypeId } = createOrderDto;
    const equipmentType =
      await this.equipmentTypeService.findById(equipmentTypeId);
    const owner = await this.usersService.findById(userId);
    const customer = await this.customersService.findById(customerId);
    const order = await this.orderRepository.create({
      ...createOrderDto,
      owner,
      customer,
      equipmentType,
    });
    return this.orderRepository.save(order);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Недостаточно прав для удаления заказчика');
    }
    const order = await this.orderRepository.findOne({ where: { id } });
    return this.orderRepository.remove(order);
  }
}
