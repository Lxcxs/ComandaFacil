import { Request, Response } from 'express';
import { SigninCostumerService } from '../../services/costumer/CreateService';
import { findHeaders } from '../../utils/findHeaders';

export class CreateCostumerController {
  async handle(req: Request, res: Response) {
    try {
      const costumerService = new SigninCostumerService();
      const { tableNumber, tablePeopleAmount, waiterId, costumerName } = req.body;
      const token = findHeaders(req, "authorization");
      const storeId = parseInt(token.storeId);
      if (isNaN(storeId)) {
        return res.status(400).json({ error: "Controller: Invalid store ID" });
      }

      const result = await costumerService.execute({ tableNumber, tablePeopleAmount, waiterId, storeId, costumerName });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error creating costumer.'}` });
    }
  }
}