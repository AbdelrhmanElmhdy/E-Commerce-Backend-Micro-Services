import { Model, Column, Table, ForeignKey, HasOne, BelongsToMany, HasMany, IsEmail } from 'sequelize-typescript';
import { DeliveryAddress } from './DeliveryAddress';
import { Order } from '../Order';
import { IsPhoneNumber } from 'class-validator';

@Table
export class ContactInformation extends Model<ContactInformation> {
  @Column
  name!: string;

  @IsPhoneNumber('EG')
  @Column
  phoneNumber!: string;

  @IsEmail
  @Column
  email!: string;
}
