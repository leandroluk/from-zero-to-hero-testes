import { ProductController } from '../controllers';
import { ProductModel } from '../models';
import { ProductService } from '../services';

export const makeProductController = (): ProductController => {
  const productService = new ProductService(ProductModel);
  const productController = new ProductController(productService);
  return productController;
};
