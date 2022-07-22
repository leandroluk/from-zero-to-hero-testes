import { Request, Response } from 'express';
import { ProductService } from '../services';

export class ProductController {
  constructor(
    readonly productService: ProductService
  ) { }

  async edit(req: Request, res: Response): Promise<void> {
    const [{ id }, changes] = await Promise.all([
      this.productService.validateParamsId(req.params),
      this.productService.validateBodyEdit(req.body),
    ]);
    await this.productService.exists(id);
    await this.productService.edit(id, changes);
    const result = await this.productService.get(id);
    res.json(result);
  }

  async add(req: Request, res: Response): Promise<void> {
    const data = await this.productService.validateBodyAdd(req.body);
    const id = await this.productService.add(data);
    const result = await this.productService.get(id);
    res.status(201).json(result);
  }

  async remove(req: Request, res: Response): Promise<void> {
    const { id } = await this.productService.validateParamsId(req.params);
    await this.productService.exists(id);
    await this.productService.remove(id);
    res.sendStatus(204);
  }

  async get(req: Request, res: Response): Promise<void> {
    const { id } = await this.productService.validateParamsId(req.params);
    await this.productService.exists(id);
    const result = await this.productService.get(id);
    res.json(result);
  }

  async list(_req: Request, res: Response): Promise<void> {
    const result = await this.productService.list();
    res.json(result);
  }
}
