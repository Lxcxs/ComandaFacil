import { Request, Response } from "express";
import { GetCostumerTabService } from "../../services/tab/getCostumerTabService";

export class GetCostumerTabController {
  async handle(req: Request, res: Response) {
    const costumerService = new GetCostumerTabService();

    try {
      const costumerId = Number(req.params.costumerId); // Converte storeId para número

      if (isNaN(costumerId)) {
        return res.status(400).json({ error: 'Invalid costumerId. It must be a number.' });
      }

      const result = await costumerService.execute(costumerId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting items.'}` });
    }
  }
}
