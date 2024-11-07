import { Response, Request } from "express";
import { CreateStoreService } from "../../services/store/CreateService";

export class CreateStoreController {
  async handle(req: Request, res: Response) {
    try {
      const { storeName, storeImage, storeTableAmount, userId } = req.body;
      const storeService = new CreateStoreService();
      const result = await storeService.execute({ name:storeName, image:storeImage, tableCount:storeTableAmount, userId });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error creating store.'}` });
    }
  }
}