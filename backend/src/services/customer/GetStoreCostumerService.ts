import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";

export class GetStoreCustomerService {
    async execute(storeId: number) {
        try {
            await validateStore(storeId);

            const customers = await prismaClient.customer.findMany({
                where: {
                    storeId,
                }
            });
            
            if (!customers || customers.length === 0) {
                throw new Error("Service: no orders found for this store.");
            }

            return customers;
        } catch (error) {
            throw new Error(
                `Service: ${error instanceof Error ? error.message : "error fetching orders"}`
            );
        }
    }
}
