import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { GetStoreTableService } from "../../services/table/GetByStoreService";

export class GetStoreTableController {
  async handle(req: Request, res: Response) {
    try {
      const token = findHeaders(req, "authorization");
      const idPath = req.path;

      if (`/${token?.storeId}` !== idPath) {
        return res.status(403).json({ error: "The path doesn't match the token." });
      }

      const storeId = parseInt(token?.storeId);
      const tableService = new GetStoreTableService();
      const result = await tableService.execute(storeId);

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting store by id.'}` });
    }
  }
}