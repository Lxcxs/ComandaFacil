import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { itemName, itemImage, itemAmount, customerNote, itemId, storeId, customerId, tableId, orderValue, isIndividual, guestName } = req.body;
      const orderService = new CreateOrderService();
      const result = await orderService.execute({
        itemName,
        itemImage,
        quantity: itemAmount,
        customerNote: customerNote,
        storeId,
        customerId: customerId,
        tableId,
        price: orderValue,
        itemId,
        isIndividual,
        guestName
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'An unexpected error occurred'}` });
    }
  }
}