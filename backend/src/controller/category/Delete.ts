import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteService";

export class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const categoryService = new DeleteCategoryService()
      const { id } = req.body;
      const result = await categoryService.execute({ id });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error deleting category'}` });
    }
  }
}