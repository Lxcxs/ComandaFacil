import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { CreateTabService } from "../../services/tabServices/CreateTabService";

class CreateTabController {
  async handle(req: Request, res: Response) {
    const storeToken = findHeaders(req, "authorization");
    const costumerToken = findHeaders(req, "costumer");

    if (!storeToken || !storeToken.storeId || !costumerToken || !costumerToken.costumerId || !costumerToken.table) {
      return res.status(401).json({ error: "Controller: Unauthorized access" });
    }

    const tabService = new CreateTabService();
    const storeId = storeToken.storeId;
    const costumerId = parseInt(costumerToken.costumerId);
    const tableId = costumerToken.table;

    const result = await tabService.execute(costumerId, storeId, tableId);

    return res.status(201).json(result);
  }
}
export { CreateTabController };