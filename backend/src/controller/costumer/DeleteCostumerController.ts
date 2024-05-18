import { Request, Response } from "express";
import { DeleteCostumerService } from "../../services/CostumerServices/DeleteCostumerService";

class DeleteCostumerController {
  async handle(req: Request, res: Response) {
    const { id, userId } = req.body;

    const itemService = new DeleteCostumerService();

    const result = await itemService.execute({ id, userId });

    res.status(200).send(result);
  }
}

export { DeleteCostumerController };
