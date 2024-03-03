import { Model, Column, Table, HasMany, DefaultScope } from 'sequelize-typescript';
import { Area } from './Area';

@DefaultScope(() => ({
  attributes: ['id', 'name'],
}))
@Table
export class City extends Model<City> {
  @Column
  name!: string;

  @HasMany(() => Area)
  areas: Area[];
}
