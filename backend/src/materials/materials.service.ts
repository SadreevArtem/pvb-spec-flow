import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}
  findAll(): Promise<Material[]> {
    return this.materialRepository.find({ order: { id: 'ASC' } });
  }
  create(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.save({
      ...createMaterialDto,
    });
  }
  findById(id: number) {
    return this.materialRepository.findOneBy({ id });
  }
  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return this.materialRepository.update(id, updateMaterialDto);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления справочника материалов',
      );
    }
    const material = await this.materialRepository.findOne({
      where: { id },
    });
    return this.materialRepository.remove(material);
  }
}
