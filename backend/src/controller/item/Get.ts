import { Request, Response } from "express";
import { GetItemService } from "../../services/item/GetService";

export class GetItemController {
  async handle(req: Request, res: Response) {
    try {
      const itemService = new GetItemService();
      const result = await itemService.execute();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting items.'}` });
    }
  }
}