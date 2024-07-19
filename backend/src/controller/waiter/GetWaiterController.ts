import { Request, Response } from "express";
import { GetWaiterService } from "../../services/waiterServices/GetWaiterService";

class GetWaiterController {
  async handle(req: Request, res: Response) {

    const waiterService = new GetWaiterService();

    const result = await waiterService.execute();

    res.status(201).send(result);
  }
}

export { GetWaiterController };
