import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { UpdateOrderStatusService } from "../../services/order/UpdateOrderService";

export class UpdateOrderStatusController {
  async handle(req: Request, res: Response) {
    try {
      const storeToken = findHeaders(req, "authorization");
      const storeId = parseInt(storeToken.storeId);
      const { status, tabId } = req.body;
      const orderService = new UpdateOrderStatusService();
      const result = await orderService.execute(storeId, status, tabId);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'An unexpected error occurred'}` });
    }
  }
}