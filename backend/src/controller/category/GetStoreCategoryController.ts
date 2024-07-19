import { Request, Response } from "express";
import { GetStoreCategoryService } from "../../services/categoryServices/GetStoreCategoryService";

class GetStoreCategoryController {
  async handle(req: Request, res: Response) {
    const { storeId } = req.body;
    const categoryService = new GetStoreCategoryService();

    const result = await categoryService.execute({ storeId });
    return res.status(201).json(result);
  }
};
export { GetStoreCategoryController };