import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { UpdateOrderStatusService } from "../../services/orderServices/UpdateOrderService";

class UpdateOrderStatusController {

  async handle(req: Request, res: Response) {
    const storeToken = findHeaders(req, "authorization");
    const storeId = parseInt(storeToken?.storeId);
    const orderService = new UpdateOrderStatusService();
    const { status, tabId } = req.body

    const result = orderService.execute(storeId, status, tabId);
    return res.status(200).json(result)
  }
}
export { UpdateOrderStatusController };