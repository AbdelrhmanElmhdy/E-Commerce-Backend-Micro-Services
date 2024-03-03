import {
  Model,
  Column,
  Table,
  IsEmail,
  Unique,
  IsUUID,
  PrimaryKey,
  HasMany,
  Scopes,
  DefaultScope,
} from 'sequelize-typescript';
import { RefreshToken } from './RefreshToken';

export class UserScope {
  static includingSensitiveData = 'includingSensitiveData';
  private constructor() {}
}

@DefaultScope(() => ({
  attributes: ['name', 'email'],
}))
@Scopes(() => ({
  [UserScope.includingSensitiveData]: {
    attributes: ['id', 'name', 'email', 'password'],
  },
}))
@Table
export class User extends Model<User> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  name!: string;

  @IsEmail
  @Unique
  @Column
  email!: string;

  @Column
  password!: string;

  @HasMany(() => RefreshToken)
  refreshTokens: RefreshToken[];
}
