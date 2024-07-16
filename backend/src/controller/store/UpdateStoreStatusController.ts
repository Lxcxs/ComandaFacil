import { Request, Response } from "express";
import { UpdateStoreStatusService } from "../../services/storeServices/UpdateStoreStatusService";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../autentication/Auth";

class UpdateStoreStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const storeStatusService = new UpdateStoreStatusService();
    const { id } = req.body;
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const idPath = req.path;

    if (!token) {
      return res.status(401).json({ error: "Authorization token is missing." });
    }

    let decodedToken: JwtPayload | null;
    try {
      decodedToken = verifyToken(token);

      if (`/${decodedToken?.userId}` !== idPath) {
        return res
          .status(403)
          .json({ error: "The path doesn't match the token." });
      }
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    const userId: number = parseInt(decodedToken?.userId);
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
