import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { Config } from './config/config';
import sequelize from './sequelize';
import ProductController from './controllers/ProductController';
import OrderController from './controllers/OrderController';
import CartController from './controllers/CartController';
import { AuthController } from './controllers/AuthController';
import { LocalizationMiddleware } from './middlewares/localizationMiddleware';
import seedProducts from '../seeders/ProductSeeder';
import { SnakeCaseInterceptor } from './interceptors/SnakeCaseInterceptor';
import { allCornJobs } from './cornJobs/CornJobs';

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Start all corn jobs
allCornJobs.forEach(cornJob => cornJob.start());

const eraseDatabase = async () => {
  try {
    // Ensure that Sequelize has synced the models with the database before erasing
    await sequelize.sync({ force: true });

    console.log('Database erased successfully.');
  } catch (error) {
    console.error('Error erasing database:', error);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
};

// eraseDatabase();

// seedProducts();

const app = createExpressServer({
  routePrefix: `/api/${Config.api.apiVersion}/:locale`,
  controllers: [AuthController, ProductController, OrderController, CartController],
  development: false,
  middlewares: [LocalizationMiddleware],
  interceptors: [SnakeCaseInterceptor],
});

app.listen(Config.api.port, () => {
  console.log(`Server is running on port ${Config.api.port}`);
});
