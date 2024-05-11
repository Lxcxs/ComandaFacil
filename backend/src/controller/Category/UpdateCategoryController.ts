import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/CategoryServices/UpdateCategoryService";

class UpdateCategoryController {
  async handle(req: Request, res: Response) {
    const { id, categoryName, userId } = req.body;

    const accountService = new UpdateCategoryService();

    const result = await accountService.execute({ id, categoryName, userId });

    return result;
  }
}

export { UpdateCategoryController };
