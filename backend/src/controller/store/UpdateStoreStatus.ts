import { Request, Response } from "express";
import { UpdateStoreStatusService } from "../../services/store/UpdateStatusService";
import { findHeaders } from "../../utils/findHeaders";

export class UpdateStoreStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { storeId, storeStatus } = req.body;

      const storeService = new UpdateStoreStatusService();
      const result = await storeService.execute({ storeStatus, storeId });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: `Controller: ${error instanceof Error ? error.message : 'error updating store status.'}` });
    }
  }
}
