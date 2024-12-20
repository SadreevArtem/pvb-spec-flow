import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashValue } from 'src/helpers/hash';
import { UserRole } from 'src/types';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private async userExists(createUserDto: CreateUserDto): Promise<boolean> {
    return !!(await this.userRepository.findOne({
      where: [
        { username: Equal(createUserDto.username) },
        { email: Equal(createUserDto.email) },
      ],
    }));
  }

  async create(createUserDto: CreateUserDto) {
    // if (user.role !== UserRole.ADMIN) {
    //   throw new BadRequestException(
    //     'Недостаточно прав для создания пользователя',
    //   );
    // }
    if (await this.userExists(createUserDto)) {
      throw new BadRequestException(
        'Пользователь с указанными данными уже существует',
      );
    }
    const { password } = createUserDto;
    return this.userRepository.save({
      ...createUserDto,
      password: await hashValue(password),
    });
  }
  findAll(user: User): Promise<User[]> {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Недостаточно прав');
    }
    return this.userRepository.find({ order: { id: 'ASC' } });
  }
  //for validate user
  findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(query);
  }
  //get info about user
  findOwn(query: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(query);
  }

  async update(id: number, role, updateUserDto: UpdateUserDto) {
    if (role === UserRole.ADMIN) {
      return this.userRepository.update({ id }, updateUserDto);
    }
    const allowedFields = ['username', 'email', 'password', 'avatar']; // Поля, разрешённые для обновления
    const filteredDto = this.filterDto(updateUserDto, allowedFields);

    if (Object.keys(filteredDto).length === 0) {
      throw new BadRequestException('Нет разрешённых полей для обновления');
    }
    return this.userRepository.update({ id }, filteredDto);
  }
  findById(id: number) {
    return this.userRepository.findOneBy({ id }); // for validation
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления пользователя',
      );
    }
    const userToDelete = await this.userRepository.findOneBy({ id });
    if (!userToDelete) {
      throw new BadRequestException('Пользователь не найден');
    }
    return this.userRepository.remove(userToDelete);
  }
  private filterDto(dto: UpdateUserDto, allowedFields: string[]) {
    return Object.keys(dto)
      .filter((key) => allowedFields.includes(key))
      .reduce((filtered, key) => {
        filtered[key] = dto[key];
        return filtered;
      }, {});
  }
  // Метод для получения данных пользователя по ID для администратора
  async findByIdForAdmin(id: number, user: User) {
    // Проверяем наличие пользователя
    const userById = await this.userRepository.findOneBy({ id });
    if (!userById) {
      throw new BadRequestException('Пользователь не найден');
    }

    // Если запрос сделан администратором, возвращаем все данные
    if (user.role === UserRole.ADMIN) {
      return userById;
    }

    // Если запрос сделан обычным пользователем, возвращаем только выборочные данные
    return {
      id: userById.id,
      username: userById.username,
      about: userById.about,
      avatar: userById.avatar,
      email: userById.email,
      endContract: userById.endContract,
    };
  }
}
