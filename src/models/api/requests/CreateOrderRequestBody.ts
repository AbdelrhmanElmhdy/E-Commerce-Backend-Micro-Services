import { IsUUID } from 'class-validator';
import { PaymentMethod } from '../../entities/PaymentMethod';

export class CreateOrderRequestBody {
  paymentMethod!: PaymentMethod;

  @IsUUID(4)
  deliveryAddressId!: string;
}
