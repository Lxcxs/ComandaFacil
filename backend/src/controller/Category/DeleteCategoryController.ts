import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/CategoryServices/DeleteCategoryService";

class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const categoryService = new DeleteCategoryService();

    const result = await categoryService.execute({ id });

    res.status(200).send(result);
  }
}

export { DeleteCategoryController };
