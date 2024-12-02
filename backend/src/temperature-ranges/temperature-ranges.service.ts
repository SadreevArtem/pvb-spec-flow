import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { TemperatureRange } from './entities/temperature-range.entity';
import { CreateTemperatureRangeDto } from './dto/create-temperature-range.dto';
import { UpdateTemperatureRangeDto } from './dto/update-temperature-range.dto';

@Injectable()
export class TemperatureRangesService {
  constructor(
    @InjectRepository(TemperatureRange)
    private readonly temperatureRangeRepository: Repository<TemperatureRange>,
  ) {}
  findAll(): Promise<TemperatureRange[]> {
    return this.temperatureRangeRepository.find({ order: { id: 'ASC' } });
  }
  create(createTemperatureRangeDto: CreateTemperatureRangeDto) {
    return this.temperatureRangeRepository.save({
      ...createTemperatureRangeDto,
    });
  }
  findById(id: number) {
    return this.temperatureRangeRepository.findOneBy({ id });
  }
  update(id: number, updateTemperatureRangeDto: UpdateTemperatureRangeDto) {
    return this.temperatureRangeRepository.update(
      id,
      updateTemperatureRangeDto,
    );
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления справочника ДУ',
      );
    }
    const temperatureRange = await this.temperatureRangeRepository.findOne({
      where: { id },
    });
    return this.temperatureRangeRepository.remove(temperatureRange);
  }
}
