import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/categoryServices/DeleteCategoryService";

class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;
    const categoryService = new DeleteCategoryService();
    const result = categoryService.execute({ id });
    return res.status(201).json(result)
  }
}
export { DeleteCategoryController };