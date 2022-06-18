import { Request, Response } from 'express';
import { productService } from '../services';

export const productController = {
  async remove(req: Request, res: Response): Promise<void> {
    const { id } = await productService.validateParamsId(req.params);
    await productService.exists(id);
    await productService.remove(id);
    res.sendStatus(204);
  },

  async edit(req: Request, res: Response): Promise<void> {
    const [{ id }, changes] = await Promise.all([
      productService.validateParamsId(req.params),
      productService.validateBodyEdit(req.body),
    ]);
    await productService.exists(id);
    await productService.edit(id, changes);
    const result = await productService.get(id);
    res.json(result);
  },

  async get(req: Request, res: Response): Promise<void> {
    const { id } = await productService.validateParamsId(req.params);
    await productService.exists(id);
    const result = await productService.get(id);
    res.json(result);
  },

  async add(req: Request, res: Response): Promise<void> {
    const data = await productService.validateBodyAdd(req.body);
    const id = await productService.add(data);
    const result = await productService.get(id);
    res.status(201).json(result);
  },

  async list(_req: Request, res: Response): Promise<void> {
    const result = await productService.list();
    res.json(result);
  },
};
