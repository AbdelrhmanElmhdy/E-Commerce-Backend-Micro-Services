import corn from 'node-cron';
import { InvalidatedAccessToken } from '../models/entities/InvalidatedAccessToken';
import { Op } from 'sequelize';
import { Config } from '../config/config';

// Schedule a corn job at least every two hours to delete invalidated access tokens that have expired.
const twoHoursInMinutes = 2 * 60;
const minutes = Math.max(Config.authTokens.accessTokenExpirationDurationInMinutes, twoHoursInMinutes);

export const cleanInvalidatedAccessTokens = corn.schedule(`*/${minutes} * * * *`, () => {
  InvalidatedAccessToken.destroy({ where: { expirationDate: { [Op.lt]: new Date() } } });
});
