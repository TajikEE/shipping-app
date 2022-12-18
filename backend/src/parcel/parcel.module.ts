import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Parcel from './parcel.entity';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Parcel])],
  providers: [ParcelService],
  controllers: [ParcelController],
})
export class ParcelModule {}
