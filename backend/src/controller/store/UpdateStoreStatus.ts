import { Request, Response } from "express";
import { UpdateStoreStatusService } from "../../services/store/UpdateStatusService";
import { findHeaders } from "../../utils/findHeaders";

export class UpdateStoreStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;
      const idPath = req.path;
      const token = findHeaders(req, "authorization");

      if (`/${token?.userId}` !== idPath) {
        return res.status(403).json({ error: "The path doesn't match the token." });
      }

      const userId = parseInt(token.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID in token." });
      }

      const storeService = new UpdateStoreStatusService();
      const result = await storeService.execute({ id, userId });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: `Controller: ${error instanceof Error ? error.message : 'error updating store status.'}` });
    }
  }
}
