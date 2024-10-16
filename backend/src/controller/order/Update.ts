import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { UpdateOrderStatusService } from "../../services/order/UpdateOrderStatusService";

export class UpdateOrderController {
  async handle(req: Request, res: Response) {
    try {
      const {storeId, tabId, status} = req.body
      const updateService = new UpdateOrderStatusService();
      const result = await updateService.execute(storeId, tabId, status);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error updating.'}` });
    }
  }
}
