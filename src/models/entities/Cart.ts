import { Model, Column, Table, DataType, ForeignKey, BelongsTo, PrimaryKey, IsUUID } from 'sequelize-typescript';
import { Order } from './Order';
import { PriceDetails } from './PriceDetails';

export class CartItem {
  id!: string;

  name!: string;

  thumbnailImageUrl!: string;

  price!: PriceDetails;

  quantity!: number;

  constructor(id: string, name: string, thumbnailImageUrl: string, price: PriceDetails, quantity: number) {
    this.id = id;
    this.name = name;
    this.thumbnailImageUrl = thumbnailImageUrl;
    this.price = price;
    this.quantity = quantity;
  }
}

@Table
export class Cart extends Model<Cart> {
  @PrimaryKey
  @IsUUID(4)
  @Column
  userId!: string;

  @Column(DataType.JSON)
  items!: CartItem[];

  get totalQuantity(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get totalOriginalPrice(): number {
    return this.items.reduce((total, { price, quantity }) => total + price.original * quantity, 0);
  }

  get totalPriceAfter(): number {
    return this.items.reduce(
      (total, { price, quantity }) => total + price.original * price.discountPercentage * quantity,
      0
    );
  }
}
