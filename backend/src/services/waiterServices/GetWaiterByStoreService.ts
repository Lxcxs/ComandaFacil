import { validateStore } from "../../utils/validateStore";
import prismaClient from "../../prisma";

interface GetById {
  storeId: number;
}

class GetWaiterByStoreService {
  async execute({ storeId }: GetById) {
    const existingStore = await validateStore(storeId);
    const waiters = await prismaClient.waiter.findMany({
      where: {
        storeId: existingStore?.id,
      }
    })

    return waiters;
  }
}

export { GetWaiterByStoreService };
