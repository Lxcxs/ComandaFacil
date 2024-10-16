import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";

interface DTO {
    storeId: number;
}

export class GetOrdersByStoreService {
    async execute({ storeId }: DTO) {
        try {
            await validateStore(storeId);

            const orders = await prismaClient.order.findMany({
                where: {
                    storeId,
                }
            });
            
            if (!orders || orders.length === 0) {
                throw new Error("Service: no orders found for this store.");
            }

            return orders;
        } catch (error) {
            throw new Error(
                `Service: ${error instanceof Error ? error.message : "error fetching orders"}`
            );
        }
    }
}
