import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";

interface IGetStore {
  storeId: number;
}

class GetStoreItemService {
  async execute({ storeId }: IGetStore) {
    validateFields({ storeId })
    const existingStore = await prismaClient.store.findUnique({
      where: {
        id: storeId,
      }
    });
    if (!existingStore) throw new Error("Service: store not found.");

    const items = await prismaClient.item.findMany({
      where: {
        storeId: existingStore.id,
      }
    });

    return items;
  }
}
export { GetStoreItemService };