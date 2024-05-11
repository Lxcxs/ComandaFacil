import { Response, Request } from "express";
import { CreateCategoryService } from "../../services/CategoryServices/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { categoryName, userId } = req.body;

    const accountService = new CreateCategoryService();

    const account = await accountService.execute({ categoryName, userId });

    return res.status(201).send(account)
  }
}

export { CreateCategoryController }