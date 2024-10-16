import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { itemName, itemImage, itemAmount, costumerNote, itemId, storeId, costumerId, tableId, orderValue } = req.body;
      const orderService = new CreateOrderService();
      const result = await orderService.execute({
        itemName,
        itemImage,
        itemAmount,
        costumerNote,
        storeId,
        costumerId,
        tableId,
        orderValue,
        itemId
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'An unexpected error occurred'}` });
    }
  }
}