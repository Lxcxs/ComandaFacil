import { Request, Response } from "express";
import { GetItemService } from "../../services/itemServices/GetItemService";

class GetItemController {
  async handle(req: Request, res: Response) {
    const itemService = new GetItemService();
    const result = await itemService.execute();
    return res.status(201).json(result);
  }
}
export { GetItemController };