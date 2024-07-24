import { Request, Response } from 'express';
import { SigninCostumerService } from '../../services/costumerServices/SigninCostumerService';
import { findHeaders } from '../../utils/findHeaders';

class CreateCostumerController {
  async handle(req: Request, res: Response) {
    try {
      const { tableNumber, tablePeopleAmount, waiterId, costumerName } = req.body;
      const token = findHeaders(req, "authorization");

      if (!token || !token.storeId) {
        return res.status(401).json({ error: "Controller: Unauthorized access" });
      }

      const storeId = parseInt(token.storeId);
      if (isNaN(storeId)) {
        return res.status(400).json({ error: "Controller: Invalid store ID" });
      }

      const signinCostumerService = new SigninCostumerService();
      const result = await signinCostumerService.execute({tableNumber, tablePeopleAmount,waiterId, storeId, costumerName});
      return res.status(201).json(result);
    } catch (error) {
      
      const errorMessage = error instanceof Error ? error.message : "Controller: An unexpected error occurred";

      return res.status(400).json({ error: errorMessage });
    }
  }
}

export { CreateCostumerController };