import { Request, Response } from 'express';
import { productService, saleService } from '../services';

export const saleController = {
  async edit(req: Request, res: Response): Promise<void> {
    const [{ id: id }, changes] = await Promise.all([
      saleService.validateParamsId(req.params),
      saleService.validateBodyEdit(req.body),
    ]);
    await saleService.exists(id);
    await saleService.edit(id, changes);
    const result = await saleService.get(id);
    res.json(result);
  },

  async add(req: Request, res: Response): Promise<void> {
    const data = await saleService.validateBodyAdd(req.body);
    const arrayOfProductId = data.products.map((product) => product.id);
    await productService.existsByArrayOfId(arrayOfProductId);
    const id = await saleService.add(data);
    const result = await saleService.get(id);
    res.status(201).json(result);
  },

  async remove(req: Request, res: Response): Promise<void> {
    const { id: id } = await saleService.validateParamsId(req.params);
    await saleService.exists(id);
    await saleService.remove(id);
    res.sendStatus(204);
  },

  async get(req: Request, res: Response): Promise<void> {
    const { id: id } = await saleService.validateParamsId(req.params);
    await saleService.exists(id);
    const result = await saleService.get(id);
    res.json(result);
  },

  async list(_req: Request, res: Response): Promise<void> {
    const result = await saleService.list();
    res.json(result);
  },
};
