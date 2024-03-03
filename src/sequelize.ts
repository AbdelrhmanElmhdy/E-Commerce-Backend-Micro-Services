import { Sequelize } from 'sequelize-typescript';
import { User } from './models/entities/User';
import { Product } from './models/entities/Product';
import { Order } from './models/entities/Order';
import { Area } from './models/entities/ShippingInformation/Area';
import { Cart } from './models/entities/Cart';
import { City } from './models/entities/ShippingInformation/City';
import { ContactInformation } from './models/entities/ShippingInformation/ContactInformation';
import { DeliveryAddress } from './models/entities/ShippingInformation/DeliveryAddress';
import { ProductCategory } from './models/entities/ProductCategory';
import { RefreshToken } from './models/entities/RefreshToken';
import { InvalidatedRefreshToken } from './models/entities/InvalidatedRefreshToken';
import { InvalidatedAccessToken } from './models/entities/InvalidatedAccessToken';

const sequelize = new Sequelize({
  username: 'abdelrhman',
  password: 'postgres-password',
  database: 'ecommerce',
  host: 'localhost',
  dialect: 'postgres',
  models: [
    User,
    Product,
    Order,
    Cart,
    Area,
    City,
    DeliveryAddress,
    ContactInformation,
    ProductCategory,
    RefreshToken,
    InvalidatedRefreshToken,
    InvalidatedAccessToken,
  ],
});

export default sequelize;
