import { JsonController, Get, QueryParam, Param, InternalServerError, NotFoundError } from 'routing-controllers';
import { Product, ProductScope } from '../models/entities/Product';
import Page from '../models/api/responses/Page';
import { Config } from '../config/config';
import L10n from '../localization/L10n';

@JsonController('/products')
class ProductController {
  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<any> {
    const product = await Product.scope(ProductScope.detailed).findByPk(id);

    if (!product) throw new NotFoundError();

    return product.dataValues;
  }

  @Get('/')
  async getProducts(
    @QueryParam('page', { type: Number, required: false }) page: number = 1
  ): Promise<Page<Product>> {
    try {
      const batchSize = Config.api.productsPageBatchSize;

      // Calculate offset based on the page number and page size
      const offset = (page - 1) * batchSize;

      // Find products with pagination
      const { rows, count } = await Product.scope(ProductScope.minimized).findAndCountAll({
        limit: batchSize,
        offset,
      });

      const products = rows.map(product => product.dataValues);
      const nextPageIsEmpty = count <= offset + batchSize;
      const nextPage = nextPageIsEmpty ? null : page + 1;

      // Send the products page as JSON response
      return { items: products, page, batchSize, nextPage };
    } catch (error) {
      console.error(error);
      throw new InternalServerError(L10n.internalServerError);
    }
  }
}

export default ProductController;
