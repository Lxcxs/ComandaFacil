import { Response, Request } from "express";
import { CreateOrderService } from "../../services/orderServices/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { name, costumerName, value, quantity, note, userId, costumerId } = req.body;

    const accountService = new CreateOrderService();

    const account = await accountService.execute({ name, costumerName, value, quantity, note, userId, costumerId });

    return res.status(201).send(account)
  }
}

export { CreateOrderController }