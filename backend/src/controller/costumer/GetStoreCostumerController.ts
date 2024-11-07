import { Request, Response } from "express";
import { GetStoreCustomerService } from "../../services/customer/GetStoreCostumerService";

export class GetStoreCostumerController {
  async handle(req: Request, res: Response) {
    const costumerService = new GetStoreCustomerService();

    try {
      const storeId = Number(req.params.storeId); // Converte storeId para número

      if (isNaN(storeId)) {
        return res.status(400).json({ error: 'Invalid storeId. It must be a number.' });
      }

      const result = await costumerService.execute(storeId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting items.'}` });
    }
  }
}
