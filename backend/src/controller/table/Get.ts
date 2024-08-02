import { Request, Response } from "express";
import { GetTableService } from "../../services/table/GetService";

export class GetTableController {
  async handle(req: Request, res: Response) {
    try {
      const tableService = new GetTableService();
      const result = await tableService.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting table.'}` });
    }
  }
}
