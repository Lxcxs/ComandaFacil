import { Response, Request } from "express";
import { GetWaiterByStoreService } from "../../services/waiterServices/GetWaiterByStoreService";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../autentication/Auth";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

class GetWaiterByStoreController {
  async handle(req: Request, res: Response): Promise<Response> {
    const storeService = new GetWaiterByStoreService();

    try {
      const token = req.headers["authorization"]?.replace("Bearer ", "");
      const idPath = req.path;

      if (!token) {
        return res
          .status(401)
          .json({ error: "Authorization token is missing." });
      }

      if (SECRET_KEY === "") {
        throw new Error("JWT Secret Key is not configured.");
      }

      let decodedToken: JwtPayload | null;
      try {
        decodedToken = verifyToken(token);
      } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }

      if (`/${decodedToken?.userId}` !== idPath) {
        return res
          .status(403)
          .json({ error: "The path doesn't match the token." });
      }

      const userId = parseInt(decodedToken?.userId);
      const result = await storeService.execute({ storeId: userId});

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An internal server error occurred." });
    }
  }
}

export { GetWaiterByStoreController };
