import { validateStore } from "../../utils/validateStore";
import prismaClient from "../../prisma";

interface GetById {
  storeId: number;
}

export class GetWaiterByStoreService {
  async execute({ storeId }: GetById) {
    try {
      const existingStore = await validateStore(storeId);
      const waiters = await prismaClient.waiter.findMany({
        where: { storeId: existingStore.id },
      });

      return waiters;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error retrieving waiters'}`);
    }
  }
}
