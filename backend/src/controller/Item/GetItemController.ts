import { Request, Response } from "express";
import { GetItemService } from "../../services/ItemServices/GetItemService";

class GetItemController {
  async handle(req: Request, res: Response) {
    
    const { userId } = req.body;

    const getItem = new GetItemService();

    const result = await getItem.execute({userId});

    res.status(201).send(result);
  }
}

export { GetItemController };
