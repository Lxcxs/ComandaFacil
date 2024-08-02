import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { UpdateTabService } from "../../services/tab/UpdateService";

export class UpdateOrderController {
  async handle(req: Request, res: Response) {
    try {
      const costumerToken = findHeaders(req, "costumer");
      const updateService = new UpdateTabService();
      const result = await updateService.execute(costumerToken.costumerId);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error updating.'}` });
    }
  }
}
