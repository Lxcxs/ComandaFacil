import { Request, Response } from "express";
import { DeleteItemService } from "../../services/ItemServices/DeleteItemService";

class DeleteItemController {
  async handle(req: Request, res: Response) {
    const { id, userId } = req.body;

    const itemService = new DeleteItemService();

    const result = await itemService.execute({ id, userId });

    res.status(200).send(result);
  }
}

export { DeleteItemController };
