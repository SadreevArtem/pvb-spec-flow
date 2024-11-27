import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { ProductType } from './entities/product-type.entity';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}
  findAll(): Promise<ProductType[]> {
    return this.productTypeRepository.find({ order: { id: 'ASC' } });
  }
  create(createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeRepository.save({ ...createProductTypeDto });
  }
  findById(id: number) {
    return this.productTypeRepository.findOneBy({ id });
  }
  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    return this.productTypeRepository.update(id, updateProductTypeDto);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления типа продукции',
      );
    }
    const ProductType = await this.productTypeRepository.findOne({
      where: { id },
    });
    return this.productTypeRepository.remove(ProductType);
  }
}
