import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    try {
      const storeToken = findHeaders(req, "authorization");
      const costumerToken = findHeaders(req, "costumer");
      const { itemName, itemImage, itemAmount, costumerNote } = req.body;
      const orderService = new CreateOrderService();
      const result = await orderService.execute({
        itemName,
        itemImage,
        itemAmount,
        costumerNote,
        storeId: storeToken.storeId,
        costumerId: costumerToken.costumerId,
        tableId: parseInt(costumerToken.table),
        orderValue: new Decimal(0),
        costumerTabId: 0
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'An unexpected error occurred'}` });
    }
  }
}