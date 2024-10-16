import { Request, Response } from "express";
import { GetOrdersByStoreService } from "../../services/order/GetOrdersByStoreService";

export class GetOrdersByStoreController {
    async handle(request: Request, response: Response) {
        const { storeId } = request.params;
        const orderService = new GetOrdersByStoreService();
        try {
            // Valida se o storeId é um número
            const id = parseInt(storeId);
            if (isNaN(id)) {
                return response.status(400).json({ error: "Invalid store ID." });
            }
            const result = await orderService.execute({storeId: id})
            return response.status(200).json(result);
        } catch (error) {
            return response.status(500).json({ error: error instanceof Error ? error.message : "Error fetching orders." });
        }
    }
}
