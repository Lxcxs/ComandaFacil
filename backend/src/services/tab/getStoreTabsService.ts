import prismaClient from "../../prisma";

export class GetStoreTabService {
    async execute( storeId: number) {
        try {
            const tab = await prismaClient.costumerTab.findMany({
                where: {
                    storeId: storeId,
                }
            });
            
            if (!tab) {
                throw new Error("Service: no tabs found for this store.");
            }

            return tab;
        } catch (error) {
            throw new Error(
                `Service: ${error instanceof Error ? error.message : "error fetching store tab"}`
            );
        }
    }
}
