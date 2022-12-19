import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelDto } from './dto/parcel.dto';
import Parcel from './parcel.entity';
import { FilterDto } from './dto/filter.dto';
import { CreateParcelRes } from './dto/create-parcel-res';

@Controller('/parcels')
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

  @Get()
  getParcels(): Promise<Parcel[]> {
    return this.parcelService.getParcels();
  }

  @Post()
  createParcel(@Body() parcel: ParcelDto): Promise<CreateParcelRes> {
    return this.parcelService.createParcel(parcel);
  }

  @Post('/filter')
  getFilteredParcels(@Body() filter: FilterDto): Promise<Parcel[]> {
    return this.parcelService.getFilteredParcels(filter);
  }
}
