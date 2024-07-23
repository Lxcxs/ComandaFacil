import { Request, Response } from "express";
import { CreateItemService } from "../../services/itemServices/CreateItemService";
import { findHeaders } from "../../utils/findHeaders";

class CreateItemController {
  async handle(req: Request, res: Response) {
    const { itemName, itemDescription, itemValue, itemStatus, itemImage, categoryId } = req.body;
    const token = findHeaders(req, "authorization");
    const itemService = new CreateItemService();

    const result = await itemService.execute({
      itemName,
      itemDescription,
      itemValue,
      itemStatus,
      itemImage,
      categoryId,
      storeId: token?.storeId,
    });

    return res.status(201).send(result)
  }
}
export { CreateItemController }