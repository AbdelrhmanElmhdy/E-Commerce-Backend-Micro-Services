import { IsUUID, Max, Min } from 'class-validator';
import { Config } from '../../../config/config';

export class AddToCartRequestBody {
  @IsUUID(4)
  productId: string;

  @Min(0)
  @Max(Config.business.maximumAllowedQuantityPerProduct)
  quantity: number;
}
