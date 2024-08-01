import { Request, Response } from "express";
import { findHeaders } from "../../utils/findHeaders";
import { CreateOrderService } from "../../services/orderServices/CreateOrderService";
import { Decimal } from "@prisma/client/runtime/library";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const storeToken = findHeaders(req, "authorization");
    const costumerToken = findHeaders(req, "costumer");
    const { itemName, itemImage, itemAmount, costumerNote } = req.body;

    const orderService = new CreateOrderService();
    const orderValue = new Decimal(0);
    const costumerTabId = 0
    if (
      !storeToken ||
      !storeToken.storeId ||
      !costumerToken ||
      !costumerToken.costumerId ||
      !costumerToken.table
    ) {
      return res.status(401).json({ error: "Controller: Unauthorized access" });
    }
    const storeId = storeToken.storeId;
    const costumerId = costumerToken.costumerId;
    const tableId = parseInt(costumerToken.table);

    const result = await orderService.execute({
      itemName,
      itemImage,
      itemAmount,
      costumerNote,
      storeId,
      costumerId,
      tableId,
      orderValue,
      costumerTabId
    });

    return res.status(201).json(result);
  }
}
export { CreateOrderController };
