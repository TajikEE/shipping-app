import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, ILike } from 'typeorm';
import Parcel from './parcel.entity';
import { ParcelDto } from './dto/parcel.dto';
import { DB_ERROR_CODES } from 'src/constants/db-error-codes';
import { CreateParcelRes } from './dto/create-parcel-res';

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

  async createParcel(parcel: ParcelDto): Promise<CreateParcelRes> {
    try {
      const newParcel = await this.parcelRepository.create({
        sku: parcel.sku,
        description: parcel.description,
        street_address: parcel.streetAddress,
        town: parcel.town,
        country: parcel.country,
        delivery_date: parcel.deliveryDate,
      });
      await this.parcelRepository.save(newParcel);
      return {
        message: 'Parcel created successfully',
        statusCode: 201,
      };
    } catch (error) {
      if (error.code === DB_ERROR_CODES.DUPLICATE_KEY) {
        throw new ConflictException('Parcel with this SKU already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getFilteredParcels(filter: any): Promise<Parcel[]> {
    let parcels = [];
    if (filter.selectedFilter === 'country') {
      parcels = await this.parcelRepository.find({
        where: {
          country: filter.searchTerm,
        },
      });
    } else if (filter.selectedFilter === 'description') {
      parcels = await this.parcelRepository.find({
        where: {
          description: ILike(`%${filter.searchTerm}%`),
        },
      });
    }

    return parcels;
  }
}
