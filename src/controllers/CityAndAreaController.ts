import { Get, JsonController } from 'routing-controllers';
import { City } from '../models/entities/ShippingInformation/City';
import { Area } from '../models/entities/ShippingInformation/Area';

@JsonController('/users')
class CityAndAreaController {
  @Get('/all-cities')
  async getAllCities() {
    const cities = await City.findAll();
    return cities.map(city => city.dataValues);
  }

  @Get('/all-areas')
  async getAllAreas() {
    const areas = await Area.findAll();
    return areas.map(area => area.dataValues);
  }
}

export default CityAndAreaController;
