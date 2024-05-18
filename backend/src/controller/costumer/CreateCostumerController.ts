import { Response, Request } from "express";
import { CreateCostumerService } from "../../services/CostumerServices/CreateCostumerService";

class CreateCostumerController {
  
  async handle(req: Request, res: Response) {
    const { costumerName, costumerTable, userId } = req.body;

    const accountService = new CreateCostumerService();

    const account = await accountService.execute({ costumerName, costumerTable, userId });

    return res.status(201).send(account)
  }
}

export { CreateCostumerController }