import prismaClient from "../../prisma";

class GetStoreTableService {
  async execute(storeId: number) {
    const existingStore = await prismaClient.store.findUnique({
      where: { id: storeId },
    });
    if (!existingStore) throw new Error("Service: store not found.");

    const tables = await prismaClient.table.findMany({
      where: { storeId: existingStore.id },
    });

    return tables;
  }
}
export { GetStoreTableService };
