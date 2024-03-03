import { JsonController, UseBefore, Post, Body, OnUndefined, Req } from 'routing-controllers';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { DeliveryAddress } from '../models/entities/ShippingInformation/DeliveryAddress';
import { AddAddressRequestBody } from '../models/api/requests/AddAddressRequestBody';
import { Request } from 'express';
import { v4 as UUID } from 'uuid';

@JsonController('/users')
class UserController {
  @OnUndefined(200)
  @UseBefore(AuthMiddleware)
  @Post('/add-address')
  async addAddress(@Req() request: Request, @Body() body: AddAddressRequestBody) {
    const userId = request['userId'];

    DeliveryAddress.create({
      id: UUID(),
      userId,
      streetName: body.streetName,
      buildingNumber: body.buildingNumber,
      floor: body.floor,
      apartmentOrOfficeNumber: body.apartmentOrOfficeNumber,
      areaId: body.areaId,
    });
  }

  @OnUndefined(200)
  @UseBefore(AuthMiddleware)
  @Post('/remove-address')
  async removeAddress(@Req() request: Request, @Body() { addressId }: { addressId: string }) {
    DeliveryAddress.destroy({ where: { id: addressId } });
  }
}

export default UserController;
