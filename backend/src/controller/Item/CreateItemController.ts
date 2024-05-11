import { Response, Request } from "express";
import { CreateItemService } from "../../services/ItemServices/CreateItemService";

class CreateItemController {
  async handle(req: Request, res: Response) {
    const { itemName, itemDescription, itemValue, userId, categoryId } = req.body;

    const accountService = new CreateItemService();

    const account = await accountService.execute({ itemName, itemDescription, itemValue, userId, categoryId });

    return res.status(201).send(account)
  }
}

export { CreateItemController }