import { Request, Response } from "express";
import { GetWaiterService } from "../../services/waiter/GetWaiterService";

export class GetWaiterController {
  async handle(req: Request, res: Response) {
    try {
      const waiterService = new GetWaiterService();
      const result = await waiterService.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting waiter.'}` });
    }
  }
}
