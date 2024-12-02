import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { Diameter } from './entities/diameter.entity';
import { CreateDiameterDto } from './dto/create-diameter.dto';
import { UpdateDiameterDto } from './dto/update-diameter.dto';

@Injectable()
export class DiametersService {
  constructor(
    @InjectRepository(Diameter)
    private readonly diameterRepository: Repository<Diameter>,
  ) {}
  findAll(): Promise<Diameter[]> {
    return this.diameterRepository.find({ order: { id: 'ASC' } });
  }
  create(createDiameterDto: CreateDiameterDto) {
    return this.diameterRepository.save({
      ...createDiameterDto,
    });
  }
  findById(id: number) {
    return this.diameterRepository.findOneBy({ id });
  }
  update(id: number, updateDiameterDto: UpdateDiameterDto) {
    return this.diameterRepository.update(id, updateDiameterDto);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления справочника ДУ',
      );
    }
    const diameter = await this.diameterRepository.findOne({
      where: { id },
    });
    return this.diameterRepository.remove(diameter);
  }
}
