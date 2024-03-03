import sequelize from '../src/sequelize';
import { Product } from '../src/models/entities/Product';
import { ProductCategory } from '../src/models/entities/ProductCategory';
import { PriceDetails } from '../src/models/entities/PriceDetails';
import { v4 as UUID } from 'uuid';

const category = {
  id: UUID(),
  name: 'Mobile Phones',
};

const generateDummyProducts = () => {
  const dummyProducts = [];

  for (let i = 1; i <= 65; i++) {
    const originalPrice = parseFloat((Math.random() * 100).toFixed(1));
    const discountPercentage = Math.random() * 0.25;

    const price: PriceDetails = {
      currency: 'EGP',
      original: originalPrice,
      discountPercentage: Math.random() < 0.5 ? discountPercentage : undefined,
    };

    const product = {
      id: UUID(),
      name: `Product ${i}`,
      price,
      description: `Description for Product ${i}`,
      thumbnailImageUrl: `https://example.com/thumbnail${i}.jpg`,
      imageUrls: [`https://example.com/image${i}_1.jpg`, `https://example.com/image${i}_2.jpg`],
      rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
      categoryId: category.id,
    };

    dummyProducts.push(product);
  }

  return dummyProducts;
};

const seedProducts = async () => {
  try {
    // Ensure that Sequelize has synced the models with the database before seeding
    await sequelize.sync();

    // Generate dummy products
    const dummyProducts = generateDummyProducts();

    // Seed product category into the database
    await ProductCategory.create(category);

    // Seed products into the database
    await Product.bulkCreate(dummyProducts);

    console.log('Seed script executed successfully.');
  } catch (error) {
    console.error('Error executing seed script:', error);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
};

export default seedProducts;
