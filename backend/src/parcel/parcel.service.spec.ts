import { Test, TestingModule } from '@nestjs/testing';
import { ParcelService } from './parcel.service';
import { Parcel } from './parcel.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ParcelController } from './parcel.controller';

describe('ParcelService', () => {
  let service: ParcelService;
  let repositoryMock: any;
  let controller: ParcelController;

  beforeEach(async () => {
    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParcelService,
        {
          provide: getRepositoryToken(Parcel),
          useValue: repositoryMock,
        },
      ],

      controllers: [ParcelController],
    }).compile();

    service = module.get<ParcelService>(ParcelService);
    controller = module.get<ParcelController>(ParcelController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createParcel', () => {
    it('should save a parcel', async () => {
      const parcel = {
        sku: '123abc',
        description: 'test',
        street_address: 'Baker Street 221B',
        town: 'Talinn',
        country: 'Estonia',
        delivery_date: new Date(),
      };

      const parcelDto = {
        sku: '123abc',
        description: 'test',
        streetAddress: 'Baker Street 221B',
        town: 'Talinn',
        country: 'Estonia',
        deliveryDate: new Date(),
      };

      const response = {
        message: 'Parcel created successfully',
        statusCode: 201,
      };

      repositoryMock.create.mockResolvedValue(parcel);
      const result = await service.createParcel(parcelDto);
      expect(result).toEqual(response);
      expect(repositoryMock.create).toHaveBeenCalledWith(parcel);
    });
  });

  describe('getParcels', () => {
    it('should return an array of parcels', async () => {
      const parcels = [
        {
          sku: '123abc',
          description: 'test',
          street_address: 'Baker Street 221B',
          town: 'Talinn',
          country: 'Estonia',
          delivery_date: new Date(),
        },
      ];

      repositoryMock.find.mockResolvedValue(parcels);
      const result = await service.getParcels();
      expect(result).toEqual(parcels);
      expect(repositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('getFilteredParcels', () => {
    it('should return an array of parcels matching country Estonia', async () => {
      const parcels = [
        {
          sku: '123abc',
          description: 'test',
          street_address: 'Baker Street 221B',
          town: 'Talinn',
          country: 'Estonia',
          delivery_date: new Date(),
        },
      ];

      const filter = {
        selectedFilter: 'country',
        searchTerm: 'Estonia',
      };

      repositoryMock.find.mockResolvedValue(parcels);
      const result = await service.getFilteredParcels(filter);
      expect(result).toEqual(parcels);
      expect(repositoryMock.find).toHaveBeenCalled();
    });
  });
});
