import { JsonController, UseBefore, Get, Post, Param, Body, OnUndefined, Req } from 'routing-controllers';
import { Order } from '../models/entities/Order';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { CreateOrderRequestBody } from '../models/api/requests/CreateOrderRequestBody';
import { Cart } from '../models/entities/Cart';
import { Request } from 'express';

@JsonController('/orders')
class OrderController {
  @UseBefore(AuthMiddleware)
  @OnUndefined(200)
  @Get('/create')
  async createOrder(
    @Req() request: Request,
    @Body() { paymentMethod, deliveryAddressId }: CreateOrderRequestBody
  ) {
    const uerId = request['userId'];
    const cart = await Cart.findByPk(uerId);
    const cartItems = cart.dataValues.items;
    const deliveryFee = 30;
    Order.create({ paymentMethod, deliveryAddressId, items: cartItems, deliveryFee });
  }
}

export default OrderController;
