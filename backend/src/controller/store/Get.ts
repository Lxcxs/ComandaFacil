import { Request, Response } from "express";
import { GetStoreService } from "../../services/store/GetService";

export class GetStoreController {
  async handle(req: Request, res: Response) {
    try {
      const getStoreCtrl = new GetStoreService();
      const result = await getStoreCtrl.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting store.'}` });
    }
  }
}
