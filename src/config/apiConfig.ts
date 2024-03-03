import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const apiConfig = {
  port: Number(process.env.API_PORT),
  productsPageBatchSize: 10,
  apiVersion: 'v1',
  supportedLocales: ['en', 'ar'],
  defaultLocale: 'en',
};
