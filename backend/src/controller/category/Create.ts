import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateService";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const categoryService = new CreateCategoryService()
      const result = await categoryService.execute(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error creating category'}` });
    }
  }
}