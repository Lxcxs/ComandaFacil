import { Request, Response } from "express";
import { GetStoreItemService } from "../../services/item/GetByStoreService";
import { findHeaders } from "../../utils/findHeaders";

export class GetStoreItemController {
  async handle(req: Request, res: Response) {
    try {
      const storeId = Number(req.params.storeId); // Extrai e converte para number
      if (isNaN(storeId)) {
        return res.status(400).json({ error: "Invalid store ID." });
      }

      const itemService = new GetStoreItemService();
      const result = await itemService.execute({ storeId });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting store by id.'}` });
    }
  }
}
