import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Parcel from './parcel.entity';
import { ParcelDto } from './dto/parcel.dto';

const HOME_COUNTRY = 'Estonia' as const;
@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
  ) {}

  async getParcels(): Promise<Parcel[]> {
    const parcels = await this.parcelRepository.find();

    if (parcels.length > 0) {
      parcels.sort((a, b) => {
        if (a.country === HOME_COUNTRY) {
          return -1;
        } else if (b.country === HOME_COUNTRY) {
          return 1;
        } else {
          return a.delivery_date.getTime() - b.delivery_date.getTime();
        }
      });
    }

    return parcels;
  }

  async createParcel(parcel: ParcelDto) {
    const newParcel = await this.parcelRepository.create({
      sku: parcel.sku,
      description: parcel.description,
      street_address: parcel.streetAddress,
      town: parcel.town,
      country: parcel.country,
      delivery_date: parcel.deliveryDate,
    });
    await this.parcelRepository.save(newParcel);
    return newParcel;
  }

  async getFilteredParcels(filter: any): Promise<Parcel[]> {
    let parcels = [];
    if (filter.selectedFilter === 'country') {
      parcels = await this.parcelRepository.find({
        where: {
          [filter.selectedFilter]: Like(`%${filter.searchTerm}%`),
        },
      });
    } else if (filter.selectedFilter === 'description') {
      parcels = await this.parcelRepository.find({
        where: {
          description: Like(`%${filter.searchTerm}%`),
        },
      });
    }

    return parcels;
  }
}
