import { Request, Response } from "express";
import { GetCostumerService } from "../../services/CostumerServices/GetCostumerService";

class GetCostumerController {
  async handle(req: Request, res: Response) {
    
    const { userId } = req.body;

    const getItem = new GetCostumerService();

    const result = await getItem.execute({userId});

    res.status(201).send(result);
  }
}

export { GetCostumerController };
