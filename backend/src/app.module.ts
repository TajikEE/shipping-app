import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as typeOrmConfig from './typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ParcelModule } from './parcel/parcel.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    ParcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
