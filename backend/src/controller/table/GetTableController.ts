import { Request, Response } from "express";
import { GetTableService } from "../../services/tableServices/GetTableService";

class GetTableController {

  async handle(req: Request, res: Response) {
    const tableService = new GetTableService();

    const result = tableService.execute();
    return res.status(200).json(result)
  }
}
export { GetTableController };