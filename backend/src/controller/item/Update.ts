import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { UpdateItemService } from "../../services/item/UpdateService";

export class UpdateItemController {
  async handle(req: Request, res: Response) {
    try {
      const { id, itemName, itemDescription, itemValue, storeId } = req.body;
      const itemService = new UpdateItemService();

      const result = await itemService.execute({
        id: id,
        name: itemName,
        description: itemDescription,
        price: itemValue,
        storeId: storeId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error updating item.'}` });
    }
  }
}
