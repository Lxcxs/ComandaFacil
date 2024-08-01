import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { UpdateTabService } from "../../services/tabServices/UpdateTabService";

class UpdateOrderController {

  async handle(req: Request, res: Response) {
    const costumerToken = findHeaders(req, "costumer");

    const updateService = new UpdateTabService();
    const costumerId = costumerToken?.costumerId;
    const result = await updateService.execute(costumerId)
    return res.status(200).json(result)
  }
}
export { UpdateOrderController };