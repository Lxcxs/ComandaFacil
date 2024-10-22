import { Request, Response } from "express";
import { GetOrdersByStoreService } from "../../services/order/GetOrdersByStoreService";

export class GetOrdersByStoreController {
  async handle(request: Request, response: Response) {
    console.log(request.params);
    const { storeId } = request.params;
    console.log("storeId: ", storeId);
    const orderService = new GetOrdersByStoreService();
    try {
      // Valida se o storeId é um número
      const id = parseInt(storeId);
      if (isNaN(id)) {
        return response.status(400).json({ error: "Invalid store ID." });
      }
      console.log("id: ", id);

      const result = await orderService.execute({ storeId: id });
      return response.status(200).json(result);
    } catch (error) {
      return response
        .status(500)
        .json({
          error:
            error instanceof Error ? error.message : "Error fetching orders.",
        });
    }
  }
}
