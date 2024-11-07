import { Request, Response } from "express";
import { CreateTableService } from "../../services/table/CreateService";

export class CreateTableController {
  async handle(req: Request, res: Response) {
    try {
      console.log(req.body);
      const { tableNumber, tablePeopleAmount, waiterId, storeId } = req.body;
      // console.log(tableNumber, tablePeopleAmount, waiterId, storeId)

      if (!storeId) {
        return res.status(401).json({ error: "Controller: Unauthorized access, storeId is required." });
      }

      const tableService = new CreateTableService();
      const result = await tableService.execute({ number:tableNumber, peopleCount:tablePeopleAmount, waiterId, storeId });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error creating table.'}` });
    }
  }
}
