import { Model, Column, Table, HasMany, IsUUID, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { City } from './City';
import { Area } from './Area';
import { Order } from '../Order';

@Table
export class DeliveryAddress extends Model<DeliveryAddress> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare id: string;

  @IsUUID(4)
  @Column
  userId: string;

  @Column
  streetName!: string;

  @Column
  buildingNumber!: string;

  @Column
  floor!: string;

  @Column
  apartmentOrOfficeNumber!: string;

  @ForeignKey(() => Area)
  @Column
  areaId!: number;

  @BelongsTo(() => Area)
  area: Area;

  @HasMany(() => Order)
  orders!: Order[];
}
