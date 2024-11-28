import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Construction } from './entities/construction.entity';
import { Repository } from 'typeorm';
import { CreateConstructionDto } from './dto/create-construction.dto';
import { UpdateConstructionDto } from './dto/update-construction.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';

@Injectable()
export class ConstructionsService {
  constructor(
    @InjectRepository(Construction)
    private readonly constructionRepository: Repository<Construction>,
  ) {}
  findAll(): Promise<Construction[]> {
    return this.constructionRepository.find({ order: { id: 'ASC' } });
  }
  create(createConstructionDto: CreateConstructionDto) {
    return this.constructionRepository.save({ ...createConstructionDto });
  }
  findById(id: number) {
    return this.constructionRepository.findOneBy({ id });
  }
  update(id: number, updateConstructionDto: UpdateConstructionDto) {
    return this.constructionRepository.update(id, updateConstructionDto);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления типа конструкции',
      );
    }
    const construction = await this.constructionRepository.findOne({
      where: { id },
    });
    return this.constructionRepository.remove(construction);
  }
}
