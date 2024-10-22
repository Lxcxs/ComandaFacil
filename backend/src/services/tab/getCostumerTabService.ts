import prismaClient from "../../prisma";

export class GetCostumerTabService {
    async execute( costumerId: number) {
        try {
            const tab = await prismaClient.costumerTab.findMany({
                where: {
                    costumerId,
                }
            });
            
            if (!tab || tab.length === 0) {
                throw new Error("Service: no tabs found for this store.");
            }

            return tab;
        } catch (error) {
            throw new Error(
                `Service: ${error instanceof Error ? error.message : "error fetching costumer tab"}`
            );
        }
    }
}
