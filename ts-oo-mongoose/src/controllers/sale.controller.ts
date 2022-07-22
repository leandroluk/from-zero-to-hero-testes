import { Request, Response } from 'express';
import { ProductService, SaleService } from '../services';

export class SaleController {
  constructor(
    readonly saleService: SaleService,
    readonly productService: ProductService
  ) { }

  async edit(req: Request, res: Response): Promise<void> {
    const [{ id }, changes] = await Promise.all([
      this.saleService.validateParamsId(req.params),
      this.saleService.validateBodyEdit(req.body),
    ]);
    await this.saleService.exists(id);
    await this.saleService.edit(id, changes);
    const result = await this.saleService.get(id);
    res.json(result);
  }

  async add(req: Request, res: Response): Promise<void> {
    const data = await this.saleService.validateBodyAdd(req.body);
    const arrayOfProductId = data.products.map((product) => product.id);
    await this.productService.existsByArrayOfId(arrayOfProductId);
    const id = await this.saleService.add(data);
    const result = await this.saleService.get(id);
    res.status(201).json(result);
  }

  async remove(req: Request, res: Response): Promise<void> {
    const { id } = await this.saleService.validateParamsId(req.params);
    await this.saleService.exists(id);
    await this.saleService.remove(id);
    res.sendStatus(204);
  }

  async get(req: Request, res: Response): Promise<void> {
    const { id } = await this.saleService.validateParamsId(req.params);
    await this.saleService.exists(id);
    const result = await this.saleService.get(id);
    res.json(result);
  }

  async list(_req: Request, res: Response): Promise<void> {
    const result = await this.saleService.list();
    res.json(result);
  }
}
