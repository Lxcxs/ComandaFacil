import { Request, Response } from "express";
import { UpdateTabValueService } from "../../services/tab/UpdateOrderValueService";

export class UpdateTabValueController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { costumerId } = req.body;
    const updateTabService = new UpdateTabValueService();

    try {
      const result = await updateTabService.execute(Number(costumerId));

      return res.status(200).json(result);
    } catch (error) {

      return res.status(400).json({
        message: `Controller: ${error instanceof Error ? error.message : 'Error updating tab'}`,
      });
    }
  }
}
