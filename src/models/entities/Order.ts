import { Model, Column, Table, ForeignKey, DataType, HasOne, BelongsTo } from 'sequelize-typescript';
import { Cart, CartItem } from './Cart';
import { PaymentMethod } from './PaymentMethod';
import { DeliveryAddress } from './ShippingInformation/DeliveryAddress';

enum OrderStatus {
  incompleteData = 'incompleteData',
  ready = 'ready',
  requested = 'requested',
  prepared = 'prepared',
  delivered = 'delivered',
}

@Table
export class Order extends Model<Order> {
  @Column(DataType.JSON)
  items!: CartItem[];

  @Column
  paymentMethod!: PaymentMethod;

  @Column({ type: DataType.FLOAT })
  deliveryFee!: number;

  @ForeignKey(() => DeliveryAddress)
  @Column
  deliveryAddressId!: string;

  @BelongsTo(() => DeliveryAddress)
  deliveryAddress!: DeliveryAddress;

  @Column
  orderStatus!: OrderStatus;
}
