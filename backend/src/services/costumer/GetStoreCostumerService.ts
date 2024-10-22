import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";

export class GetStoreCostumerService {
    async execute(storeId: number) {
        try {
            await validateStore(storeId);

            const costumers = await prismaClient.costumer.findMany({
                where: {
                    storeId,
                }
            });
            
            if (!costumers || costumers.length === 0) {
                throw new Error("Service: no orders found for this store.");
            }

            return costumers;
        } catch (error) {
            throw new Error(
                `Service: ${error instanceof Error ? error.message : "error fetching orders"}`
            );
        }
    }
}
