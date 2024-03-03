import { Model, Column, Table, BelongsTo, ForeignKey, HasMany, DefaultScope } from 'sequelize-typescript';
import { City } from './City';
import { DeliveryAddress } from './DeliveryAddress';

@DefaultScope(() => ({
  attributes: ['id', 'name', 'cityId'],
}))
@Table
export class Area extends Model<Area> {
  @Column
  name!: string;

  @ForeignKey(() => City)
  @Column
  cityId: number;

  @BelongsTo(() => City)
  city: City;

  @HasMany(() => DeliveryAddress)
  deliveryAddresses: DeliveryAddress[];
}
