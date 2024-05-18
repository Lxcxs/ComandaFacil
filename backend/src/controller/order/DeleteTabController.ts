import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/orderServices/DeleteOrderService";

class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const { id, userId, costumerId } = req.body;

    const categoryService = new DeleteOrderService();

    const result = await categoryService.execute({ id, userId, costumerId });

    res.status(200).send(result);
  }
}

export { DeleteOrderController };
