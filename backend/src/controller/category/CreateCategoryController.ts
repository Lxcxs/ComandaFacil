import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/categoryServices/CreateCategoryService";

class CreateCategoryController {
  async handle( req: Request, res: Response) {
    const { categoryName, storeId } = req.body;
    const categoryService = new CreateCategoryService();

    const result = categoryService.execute({ categoryName, storeId });

    return res.status(201).json(result);
  }
}
export { CreateCategoryController };