import { Min, MinLength } from 'class-validator';

export class AddAddressRequestBody {
  @MinLength(8)
  streetName!: string;

  @MinLength(1)
  buildingNumber!: string;

  @MinLength(1)
  floor!: string;

  @MinLength(1)
  apartmentOrOfficeNumber!: string;

  @Min(0)
  areaId!: number;
}
