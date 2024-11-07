import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateService";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const { categoryName, storeId } = req.body;
      const categoryService = new CreateCategoryService()
      const result = await categoryService.execute({ name:categoryName, storeId});
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error creating category'}` });
    }
  }
}