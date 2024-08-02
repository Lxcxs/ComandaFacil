import { Response, Request } from "express";
import { GetStoreByIdService } from "../../services/store/GetByIdService";
import { findHeaders } from "../../utils/findHeaders";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export class GetStoreByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const token = findHeaders(req, "authorization");
      const idPath = req.path;

      if (SECRET_KEY === "") {
        throw new Error("JWT Secret Key is not configured.");
      }

      if (`/${token.userId}` !== idPath) {
        return res.status(403).json({ error: "The path doesn't match the token." });
      }

      const userId = parseInt(token.userId);
      const storeService = new GetStoreByIdService();
      const result = await storeService.execute({ userId });

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting store by id.'}` });
    }
  }
}