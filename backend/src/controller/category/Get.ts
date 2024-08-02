import { Request, Response } from "express";
import { GetCategoryService } from "../../services/category/GetService";

export class GetCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const categoryService = new GetCategoryService()
      const result = await categoryService.execute();
      res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting category'}` });
    }
  }
}