import prismaClient from "../../prisma";

export class UpdateTableStatusService {
  async execute(storeId: number, tableId: number, newStatus: string) {
    try {
      const existingStore = await prismaClient.store.findFirst({
        where: { id: storeId },
      });
      if (!existingStore) throw new Error("Service: Store not found.");

      const existingTable = await prismaClient.table.findFirst({
        where: { id: tableId, storeId: existingStore.id },
      });
      if (!existingTable) throw new Error("Service: Table not found.");

      const updatedTable = await prismaClient.table.update({
        where: { id: tableId },
        data: { status: newStatus },
      });

      return updatedTable;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating table status'}`);
    }
  }
}
