import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class InvalidatedAccessToken extends Model {
  @PrimaryKey
  @Column
  token!: string;

  @Column
  expirationDate: Date;
}
