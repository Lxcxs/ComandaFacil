import { Request, Response } from "express";
import { UpdateItemService } from "../../services/ItemServices/UpdateItemService";

class UpdateItemController {
  async handle(req: Request, res: Response) {
    const { id, itemName, itemDescription, itemValue, userId } = req.body;

    const itemService = new UpdateItemService();

    const result = await itemService.execute({ id, itemName, itemDescription, itemValue, userId });

    return result;
  }
}

export { UpdateItemController };
