import { Request, Response } from "express";
import { UpdateStoreStatusService } from "../../services/storeServices/UpdateStoreStatusService";
import { findHeaders } from "../../utils/findHeaders";

class UpdateStoreStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const idPath = req.path;
    const token = findHeaders(req, "authorization");
    
    const storeStatusService = new UpdateStoreStatusService();

    if (!token) {
      return res.status(401).json({ error: "Authorization token is missing." });
    }

    if (`/${token?.userId}` !== idPath) {
      return res
        .status(403)
        .json({ error: "The path doesn't match the token." });
    }

    const userId: number = parseInt(token?.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID in token." });
    }

    try {
      const result = await storeStatusService.execute({ id, userId });
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An internal server error occurred." });
    }
  }
}

export { UpdateStoreStatusController };
