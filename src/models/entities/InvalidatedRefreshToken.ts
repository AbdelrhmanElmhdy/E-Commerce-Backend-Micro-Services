import { BelongsTo, Column, DefaultScope, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { RefreshToken } from './RefreshToken';

// @DefaultScope(() => ({
//   include: [RefreshToken],
// }))
@Table
export class InvalidatedRefreshToken extends Model {
  @PrimaryKey
  @Column
  token!: string;

  @ForeignKey(() => RefreshToken)
  @Column
  activeRefreshTokenId!: string;

  @BelongsTo(() => RefreshToken, { onDelete: 'CASCADE' })
  activeRefreshToken: RefreshToken;
}
