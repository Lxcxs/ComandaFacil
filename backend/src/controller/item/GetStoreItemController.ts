import { Request, Response } from "express";
import { GetStoreItemService } from "../../services/itemServices/GetStoreItemService";
import { verifyToken } from "../../autentication/Auth";
import { JwtPayload } from "jsonwebtoken";

class GetStoreItemController {
  async handle(req: Request, res: Response) {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const itemService = new GetStoreItemService();

    const decodedToken: JwtPayload | null = verifyToken(token as any);
    const result = itemService.execute({ storeId: decodedToken?.storeId });

    return res.status(200).json(result);
  }
}
export { GetStoreItemController };