import { Request, Response } from "express";
import { DeleteWaiterService } from "../../services/waiter/DeleteService";

export class DeleteWaiterController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const waiterService = new DeleteWaiterService();
      const result = await waiterService.execute({ id });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error deleting waiter.'}` });
    }
  }
}