import { Request, Response } from "express";
import { GetCategoryService } from "../../services/categoryServices/GetCategoryService";

class GetCategoryController {
  async handle(req: Request, res: Response) {
    const categoryService = new GetCategoryService();

    const result = await categoryService.execute();

    res.status(201).send(result);
  }
}
export { GetCategoryController };