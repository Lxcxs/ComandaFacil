import { Request, Response } from "express";
import { UpdateOrderStatusService } from "../../services/order/UpdateOrderStatusService";

export class UpdateOrderStatusController {
  async handle(req: Request, res: Response) {
    try {
      const { newStatus, storeId, orderId } = req.body;
      console.log({ newStatus, storeId, orderId });
      const orderService = new UpdateOrderStatusService();
      const result = await orderService.execute(storeId, newStatus, orderId); 

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'An unexpected error occurred'}` });
    }
  }
}
