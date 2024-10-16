import prismaClient from "../../prisma";

interface IStatus {
  storeId: number;
  storeStatus: string;
}

export class UpdateStoreStatusService {
  async execute({ storeId, storeStatus }: IStatus) {
    try {
      if (!storeStatus || !storeId) {
        throw new Error("Service: Missing required parameters.");
      }

      const store = await prismaClient.store.findFirst({ where: { id: storeId } });
      if (!store) {
        throw new Error("Service: Store not found.");
      }

      await prismaClient.store.update({
        where: { id: store.id },
        data: { storeStatus: storeStatus },
      });

      return { message: `The store status has been updated to ${storeStatus}.` };
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating store status'}`);
    }
  }
}
