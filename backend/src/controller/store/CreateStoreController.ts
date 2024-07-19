import { Response, Request } from "express";
import { CreateStoreService } from "../../services/storeServices/CreateStoreService";

class CreateStoreController {
  async handle(req: Request, res: Response) {
    const { storeName, storeImage, storeTableAmount, userId } = req.body;

    const storeService = new CreateStoreService();

    const result = await storeService.execute({ storeName, storeImage, storeTableAmount, userId });

    return res.status(201).send(result)
  }
}

export { CreateStoreController }