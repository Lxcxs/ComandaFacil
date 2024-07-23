import { Request, Response } from "express";
import { DeleteItemService } from "../../services/itemServices/DeleteItemService";
import { findHeaders } from "../../utils/findHeaders";

class DeleteItemController {
  async handle(req: Request, res: Response) {
    const token = findHeaders(req, "authorization");
    const { id } = req.body;

    const itemService = new DeleteItemService();

    const storeId = token?.storeId
    const result = await itemService.execute({ id, storeId });
    
    return res.status(200).json(result)
  }
}
export { DeleteItemController };