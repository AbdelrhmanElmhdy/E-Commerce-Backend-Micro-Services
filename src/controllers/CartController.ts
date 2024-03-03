import {
  JsonController,
  UseBefore,
  Get,
  Post,
  Req,
  InternalServerError,
  Body,
  BadRequestError,
  OnUndefined,
} from 'routing-controllers';
import { Cart, CartItem } from '../models/entities/Cart';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Request } from 'express';
import L10n from '../localization/L10n';
import { AddToCartRequestBody } from '../models/api/requests/AddToCartRequestBody';
import { Product } from '../models/entities/Product';

@JsonController('/carts')
@UseBefore(AuthMiddleware)
class CartController {
  @Get('/mine/cart-items')
  async getCart(@Req() request: Request): Promise<Object> {
    const userId = request['userId'];

    if (!userId) throw new InternalServerError(L10n.internalServerError);

    const cart = await Cart.findOne({ where: { userId } });
    return { items: cart.dataValues.items };
  }

  @OnUndefined(200)
  @Post('/update-cart')
  async updateCart(@Req() request: Request, @Body() { productId, quantity }: AddToCartRequestBody) {
    const userId = request['userId'];
    if (!userId) throw new InternalServerError(L10n.internalServerError);

    const cart = await Cart.findOne({ where: { userId } });

    const product = (await Product.findOne({ where: { id: productId } })).dataValues;

    if (!product) throw new BadRequestError();

    const updatedCartItem =
      quantity > 0
        ? new CartItem(product.id, product.name, product.thumbnailImageUrl, product.price, quantity)
        : undefined;

    if (!cart && quantity > 0) {
      Cart.create({ userId, items: [updatedCartItem] });
    } else {
      const updatedCartItems = cart.dataValues.items.filter(item => item.id !== productId);
      quantity > 0 && updatedCartItems.push(updatedCartItem);
      cart.update({ items: updatedCartItems });
    }
  }
}

export default CartController;
