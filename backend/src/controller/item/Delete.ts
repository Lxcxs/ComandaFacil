import { Request, Response } from "express";
import { DeleteItemService } from "../../services/item/DeleteService";
import { findHeaders } from "../../utils/findHeaders";

export class DeleteItemController {
  async handle(req: Request, res: Response) {
    try {
      const itemService = new DeleteItemService();
      const { id, storeId } = req.body;

      const result = await itemService.execute({ id, storeId});
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error deleting item.'}` });
    }
  }
}