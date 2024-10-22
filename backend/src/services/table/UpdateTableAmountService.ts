import prismaClient from "../../prisma";

export class UpdateTableAmountService {
  async execute(storeId: number, tableId: number, newAmountValue: number) {
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
        data: { tablePeopleAmount: newAmountValue },
      });

      return updatedTable;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating table status'}`);
    }
  }
}
