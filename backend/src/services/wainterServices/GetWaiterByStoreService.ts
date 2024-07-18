import prismaClient from "../../prisma";

interface GetById {
  storeId: number;
}

class GetWaiterByStoreService {
  async execute({ storeId }: GetById) {
    const findStore = await prismaClient.store.findFirst({
      where: {
        id: storeId,
      },
    });
    if (!storeId) throw new Error("Error: store not found.");

    const waiters = await prismaClient.waiter.findMany({
      where: {
        storeId: findStore?.id,
      }
    })

    return waiters;
  }
}

export { GetWaiterByStoreService };
