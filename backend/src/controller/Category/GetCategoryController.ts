import { Request, Response } from "express";
import { GetCategoryService } from "../../services/CategoryServices/GetCategoryService";

class GetCategoryController {
  async handle(req: Request, res: Response) {

    const getController = new GetCategoryService();

    const result = await getController.execute();

    res.status(201).send(result);
  }
}

export { GetCategoryController };
