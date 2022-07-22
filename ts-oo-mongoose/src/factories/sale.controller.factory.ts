import { SaleController } from '../controllers';
import { ProductModel, SaleModel, SaleProductModel } from '../models';
import { ProductService, SaleService } from '../services';

export const makeSaleController = (): SaleController => {
  const saleService = new SaleService(SaleModel, SaleProductModel);
  const productService = new ProductService(ProductModel);
  const saleController = new SaleController(saleService, productService);
  return saleController;
};
