import { Request, Response } from "express";
import { GetOrderService } from "../../services/orderServices/GetOrderService";

class GetOrderController {
  async handle(req: Request, res: Response) {
    const { userId } = req.body;
    const getOrder = new GetOrderService();

    const result = await getOrder.execute({ userId });

    res.status(201).send(result);
  }
}

export { GetOrderController };
