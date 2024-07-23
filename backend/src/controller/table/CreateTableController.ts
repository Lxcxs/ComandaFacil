import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { CreateTableService } from "../../services/tableServices/CreateTableService";

class CreateTableController {
  
  async handle(req: Request, res: Response) {
    const token = findHeaders(req, "authorization");
    const { tableNumber, tablePeopleAmount, waiterId } = req.body;

    const tableService = new CreateTableService();

    const storeId = parseInt(token?.storeId);
    return res.status(201).json(tableService.execute({ tableNumber, tablePeopleAmount, waiterId, storeId}))
  }
}
export { CreateTableController };