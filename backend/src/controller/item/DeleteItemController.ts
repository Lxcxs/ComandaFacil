import { Request, Response } from "express";
import { verifyToken } from "../../autentication/Auth";
import { JwtPayload } from "jsonwebtoken";
import { DeleteItemService } from "../../services/itemServices/DeleteItemService";

class DeleteItemController {
  async handle(req: Request, res: Response) {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const { id } = req.body;

    const itemService = new DeleteItemService();

    const decodedToken: JwtPayload | null = verifyToken(token as any);
    const storeId = decodedToken?.storeId
    const result = await itemService.execute({ id, storeId });
    
    return res.status(200).json(result)
  }
}
export { DeleteItemController };