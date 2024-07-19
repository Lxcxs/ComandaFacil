import { Request, Response } from "express";
import { CreateItemService } from "../../services/itemServices/CreateItemService";
import { verifyToken } from "../../autentication/Auth";
import { JwtPayload } from "jsonwebtoken";

class CreateItemController {
  async handle(req: Request, res: Response) {
    const { itemName, itemDescription, itemValue, itemStatus, itemImage, categoryId } = req.body;
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const itemService = new CreateItemService();

    const decodedToken: JwtPayload | null = verifyToken(token as string);
    const result = await itemService.execute({
      itemName,
      itemDescription,
      itemValue,
      itemStatus,
      itemImage,
      categoryId,
      storeId: decodedToken?.storeId,
    });

    return res.status(201).send(result)
  }
}
export { CreateItemController }