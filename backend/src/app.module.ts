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
import { DiametersModule } from './diameters/diameters.module';
import { ClassPressureModule } from './class-pressure/class-pressure.module';
import { TightnessClassesModule } from './tightness-classes/tightness-classes.module';
import { TemperatureRangesModule } from './temperature-ranges/temperature-ranges.module';
import { MaterialsModule } from './materials/materials.module';
import { ConnectionTypesModule } from './connection-types/connection-types.module';
import { ExcelServiceService } from './excel-service/excel-service.service';
import { ExcelServiceModule } from './excel-service/excel-service.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'), // Путь к папке с файлами
      serveRoot: '/uploads', // Путь в URL
      serveStaticOptions: {
        index: false, // Отключает автоматический поиск index.html
      },
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
    DiametersModule,
    ClassPressureModule,
    TightnessClassesModule,
    TemperatureRangesModule,
    MaterialsModule,
    ConnectionTypesModule,
    ExcelServiceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    ExcelServiceService,
  ],
})
export class AppModule {}
