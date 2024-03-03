import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './Product';

@Table
export class ProductCategory extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @Length({ min: 3 })
  @Column
  name!: string;

  @ForeignKey(() => Product)
  @Column
  productId!: string;

  @HasMany(() => Product, 'categoryId')
  products!: Product[];
}
