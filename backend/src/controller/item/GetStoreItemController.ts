import { Request, Response } from "express";
import { GetStoreItemService } from "../../services/itemServices/GetStoreItemService";
import { findHeaders } from "../../utils/findHeaders";

class GetStoreItemController {
  async handle(req: Request, res: Response) {
    const token = findHeaders(req, "authorization");
    const itemService = new GetStoreItemService();

    const result = itemService.execute({ storeId: token?.storeId });

    return res.status(200).json(result);
  }
}
export { GetStoreItemController };