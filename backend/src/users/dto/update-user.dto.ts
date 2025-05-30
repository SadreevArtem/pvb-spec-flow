import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { UserRole } from 'src/types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @Length(2, 30)
  username: string;
  @IsString()
  @IsOptional()
  @Length(2, 200)
  about: string;
  @IsString()
  @IsOptional()
  @Length(2, 200)
  adressOneLine: string;
  @IsString()
  @IsOptional()
  @Length(2, 200)
  adressTwoLine: string;
  @IsString()
  @IsOptional()
  @Length(2, 200)
  phone: string;
  @IsUrl()
  @IsOptional()
  avatar: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
  @IsDateString()
  @IsOptional()
  endContract?: Date;
}
