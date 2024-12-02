import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { ClassPressure } from './entities/class-pressure.entity';
import { CreateClassPressureDto } from './dto/create-class-pressure.dto';
import { UpdateClassPressureDto } from './dto/update-class-pressure.dto';

@Injectable()
export class ClassPressureService {
  constructor(
    @InjectRepository(ClassPressure)
    private readonly classPressureRepository: Repository<ClassPressure>,
  ) {}
  findAll(): Promise<ClassPressure[]> {
    return this.classPressureRepository.find({ order: { id: 'ASC' } });
  }
  create(createClassPressureDto: CreateClassPressureDto) {
    return this.classPressureRepository.save({
      ...createClassPressureDto,
    });
  }
  findById(id: number) {
    return this.classPressureRepository.findOneBy({ id });
  }
  update(id: number, updateClassPressureDto: UpdateClassPressureDto) {
    return this.classPressureRepository.update(id, updateClassPressureDto);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления справочника PУ',
      );
    }
    const classPressure = await this.classPressureRepository.findOne({
      where: { id },
    });
    return this.classPressureRepository.remove(classPressure);
  }
}
