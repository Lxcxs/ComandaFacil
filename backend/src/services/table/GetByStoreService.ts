import prismaClient from "../../prisma";

export class GetStoreTableService {
  async execute(storeId: number) {
    try {
      const existingStore = await prismaClient.store.findUnique({
        where: { id: storeId },
      });
      if (!existingStore) throw new Error("Service: Store not found.");

      const tables = await prismaClient.table.findMany({
        where: { storeId: existingStore.id },
      });

      return tables;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error getting tables'}`);
    }
  }
}
