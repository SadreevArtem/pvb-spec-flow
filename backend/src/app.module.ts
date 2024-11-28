import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigFactory } from './config/database-config.factory';
import { WinstonModule } from 'nest-winston';
import { UsersModule } from './users/users.module';
import * as winston from 'winston';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';
import { EquipmentTypesModule } from './equipment-types/equipment-types.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { ConstructionsModule } from './constructions/constructions.module';
import { ManufacturingStandartsModule } from './manufacturing-standarts/manufacturing-standarts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigFactory,
    }),
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
    CacheModule.register({ ttl: 5, max: 10, isGlobal: true }),
    UsersModule,
    CustomersModule,
    OrdersModule,
    AuthModule,
    ItemsModule,
    EquipmentTypesModule,
    ProductTypesModule,
    ConstructionsModule,
    ManufacturingStandartsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
