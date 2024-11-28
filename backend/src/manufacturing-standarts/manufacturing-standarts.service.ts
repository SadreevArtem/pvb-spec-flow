import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturingStandart } from './entities/manufacturing-standart.entity';
import { Repository } from 'typeorm';
import { CreateManufacturingStandartDto } from './dto/create-manufacturing-standart.dto';
import { UpdateManufacturingStandartDto } from './dto/update-manufacturing-standart.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';

@Injectable()
export class ManufacturingStandartsService {
  constructor(
    @InjectRepository(ManufacturingStandart)
    private readonly manufacturingStandartRepository: Repository<ManufacturingStandart>,
  ) {}
  findAll(): Promise<ManufacturingStandart[]> {
    return this.manufacturingStandartRepository.find({ order: { id: 'ASC' } });
  }
  create(createManufacturingStandartDto: CreateManufacturingStandartDto) {
    return this.manufacturingStandartRepository.save({
      ...createManufacturingStandartDto,
    });
  }
  findById(id: number) {
    return this.manufacturingStandartRepository.findOneBy({ id });
  }
  update(
    id: number,
    updateManufacturingStandartDto: UpdateManufacturingStandartDto,
  ) {
    return this.manufacturingStandartRepository.update(
      id,
      updateManufacturingStandartDto,
    );
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления стандарта изготовления',
      );
    }
    const manufacturingStandart =
      await this.manufacturingStandartRepository.findOne({
        where: { id },
      });
    return this.manufacturingStandartRepository.remove(manufacturingStandart);
  }
}
