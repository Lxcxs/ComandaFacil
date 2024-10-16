import { Request, Response } from "express";
import { GetStoreTableService } from "../../services/table/GetByStoreService";

export class GetStoreTableController {
  async handle(req: Request, res: Response) {
    try {
      const { storeId } = req.params; // Pegando storeId do path params
      const tableService = new GetStoreTableService();
      const result = await tableService.execute(Number(storeId));

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting store by id.'}` });
    }
  }
}
