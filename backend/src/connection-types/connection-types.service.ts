import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { ConnectionType } from './entities/connection-type.entity';
import { CreateConnectionTypeDto } from './dto/create-connection-type.dto';
import { UpdateConnectionTypeDto } from './dto/update-connection-type.dto';

@Injectable()
export class ConnectionTypesService {
  constructor(
    @InjectRepository(ConnectionType)
    private readonly connectionTypeRepository: Repository<ConnectionType>,
  ) {}
  findAll(): Promise<ConnectionType[]> {
    return this.connectionTypeRepository.find({ order: { id: 'ASC' } });
  }
  create(createConnectionTypeDto: CreateConnectionTypeDto) {
    return this.connectionTypeRepository.save({
      ...createConnectionTypeDto,
    });
  }
  findById(id: number) {
    return this.connectionTypeRepository.findOneBy({ id });
  }
  update(id: number, updateConnectionTypeDto: UpdateConnectionTypeDto) {
    return this.connectionTypeRepository.update(id, updateConnectionTypeDto);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления справочника типа присоеденения',
      );
    }
    const connectionType = await this.connectionTypeRepository.findOne({
      where: { id },
    });
    return this.connectionTypeRepository.remove(connectionType);
  }
}
