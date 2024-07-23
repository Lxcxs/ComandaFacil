import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";

interface IGetStore {
  storeId: number;
}

class GetStoreItemService {
  async execute({ storeId }: IGetStore) {
    validateFields({ storeId })
    const existingStore = await validateStore(storeId);

    const items = await prismaClient.item.findMany({
      where: {
        storeId: existingStore.id,
      }
    });

    return items;
  }
}
export { GetStoreItemService };