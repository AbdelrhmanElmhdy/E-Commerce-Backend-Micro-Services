import {
  Model,
  Column,
  Table,
  DataType,
  IsUUID,
  PrimaryKey,
  Scopes,
  Length,
  IsUrl,
  Is,
  ForeignKey,
  Min,
  Max,
} from 'sequelize-typescript';
import { isURL } from 'class-validator';
import { ProductCategory } from './ProductCategory';
import { PriceDetails } from './PriceDetails';
import ProductResponse from '../api/responses/ProductResponse';

export class ProductScope {
  static detailed = 'detailed';
  static minimized = 'minimized';
  private constructor() {}
}

@Scopes(() => ({
  [ProductScope.detailed]: {
    attributes: ['id', 'name', 'price', 'description', 'thumbnailImageUrl', 'imageUrls', 'rating'],
  },
  [ProductScope.minimized]: {
    attributes: ['id', 'name', 'price', 'thumbnailImageUrl', 'rating'],
  },
}))
@Table
export class Product extends Model implements ProductResponse {
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @Length({ min: 3 })
  @Column
  name!: string;

  @Column(DataType.JSON)
  price!: PriceDetails;

  @Length({ min: 30 })
  @Column
  description!: string;

  @IsUrl
  @Column
  thumbnailImageUrl!: string;

  @Is('Array of URLs', urls => urls.map(url => isURL(url)))
  @Column(DataType.ARRAY(DataType.STRING))
  imageUrls!: string[];

  @Min(0)
  @Max(5)
  @Column
  rating?: number;

  @ForeignKey(() => ProductCategory)
  @IsUUID(4)
  @Column
  categoryId!: string;
}
