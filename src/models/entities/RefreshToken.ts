import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from './User';
import { InvalidatedRefreshToken } from './InvalidatedRefreshToken';

@Table
export class RefreshToken extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare id: string;

  @Unique
  @Column
  token!: string;

  @Column(DataType.DATE)
  expirationDate!: Date;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => InvalidatedRefreshToken, { onDelete: 'CASCADE' })
  invalidatedRefreshTokens: InvalidatedRefreshToken[];
}
