import { Request, Response } from "express";
import { CreateWaiterService } from "../../services/waiter/CreateService";
import { findHeaders } from "../../utils/findHeaders";

export class CreateWaiterController {
  async handle(req: Request, res: Response) {
    try {
      const token = findHeaders(req, "authorization");
      const { waiterName, waiterEmail, waiterPassword, storeId } = req.body;

      if (!token || !token.storeId) {
        return res.status(401).json({ error: "Controller: Unauthorized access" });
      }

      const waiterService = new CreateWaiterService();
      const result = await waiterService.execute({ token, waiterName, waiterEmail, waiterPassword, storeId });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error creating waiter.'}` });
    }
  }
}