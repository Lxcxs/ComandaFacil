import { Request, Response } from "express";
import { GetStoreTabService } from "../../services/tab/getStoreTabsService";

export class GetStoreTabController {
  async handle(req: Request, res: Response) {
    const tabService = new GetStoreTabService();

    try {
      console.log(req.params.storeId)
      const storeId = Number(req.params.storeId);

      if (isNaN(storeId)) {
        return res.status(400).json({ error: 'Invalid storeId. It must be a number.' });
      }

      const result = await tabService.execute(storeId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting items.'}` });
    }
  }
}
