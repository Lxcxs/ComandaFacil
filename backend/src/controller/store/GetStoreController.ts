import { Request, Response } from "express";
import { GetStoreService } from "../../services/storeServices/GetStoreService";

class GetStoreController {
  async handle(req: Request, res: Response) {

    const getStoreCtrl = new GetStoreService();

    const result = await getStoreCtrl.execute();

    res.status(201).send(result);
  }
}

export { GetStoreController };
