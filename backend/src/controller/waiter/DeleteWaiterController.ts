import { Request, Response } from "express";
import { DeleteWaiterService } from "../../services/wainterServices/DeleteWaiterService";

class DeleteWaiterController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const waiterService = new DeleteWaiterService();

    const result = await waiterService.execute({ id });

    res.status(200).send(result);
  }
}

export { DeleteWaiterController };
