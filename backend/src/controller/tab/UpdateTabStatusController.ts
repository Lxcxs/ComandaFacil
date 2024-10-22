import { Request, Response } from "express";
import { UpdateTabStatusService } from "../../services/tab/UpdateTabStatusService";

export class UpdateTabStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { tabId, newStatus } = req.body;
    console.log(req.body, tabId, newStatus)

    const updateTabService = new UpdateTabStatusService();

    try {
      const result = await updateTabService.execute(tabId, newStatus);

      return res.status(200).json(result);
    } catch (error) {

      return res.status(400).json({
        message: `Controller: ${error instanceof Error ? error.message : 'Error updating tab'}`,
      });
    }
  }
}
