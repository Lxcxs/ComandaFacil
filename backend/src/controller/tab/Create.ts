import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { CreateTabService } from "../../services/tab/CreateService";

export class CreateTabController {
  async handle(req: Request, res: Response) {
    try {
      const storeToken = findHeaders(req, "authorization");
      const costumerToken = findHeaders(req, "costumer");
      const tabService = new CreateTabService();
      const storeId = storeToken.storeId;
      const costumerId = parseInt(costumerToken.costumerId);
      const tableId = costumerToken.table;

      const result = await tabService.execute(costumerId, storeId, tableId);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error creating costumer tab.'}` });
    }
  }
}
