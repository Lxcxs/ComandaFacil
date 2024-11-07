import { Request, Response } from "express";
import { CreateItemService } from "../../services/item/CreateService";
import { findHeaders } from "../../utils/findHeaders";

export class CreateItemController {
  async handle(req: Request, res: Response) {
    try {
      const { itemName, itemDescription, itemValue, itemStatus, itemImage, categoryId } = req.body;
      const token = findHeaders(req, "authorization");
      const itemService = new CreateItemService();

      const result = await itemService.execute({
        name:itemName,
        description:itemDescription,
        price:itemValue,
        status:itemStatus,
        image:itemImage,
        categoryId,
        storeId: parseInt(token.storeId),
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error creating item.'}` });
    }
  }
}