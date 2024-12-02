import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { TightnessClass } from './entities/tightness-class.entity';
import { CreateTightnessClassDto } from './dto/create-tightness-class.dto';
import { UpdateTightnessClassDto } from './dto/update-tightness-class.dto';

@Injectable()
export class TightnessClassesService {
  constructor(
    @InjectRepository(TightnessClass)
    private readonly tightnessClassRepository: Repository<TightnessClass>,
  ) {}
  findAll(): Promise<TightnessClass[]> {
    return this.tightnessClassRepository.find({ order: { id: 'ASC' } });
  }
  create(createTightnessClassDto: CreateTightnessClassDto) {
    return this.tightnessClassRepository.save({
      ...createTightnessClassDto,
    });
  }
  findById(id: number) {
    return this.tightnessClassRepository.findOneBy({ id });
  }
  update(id: number, updateTightnessClassDto: UpdateTightnessClassDto) {
    return this.tightnessClassRepository.update(id, updateTightnessClassDto);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления справочника класса герметичности',
      );
    }
    const tightnessClass = await this.tightnessClassRepository.findOne({
      where: { id },
    });
    return this.tightnessClassRepository.remove(tightnessClass);
  }
}
