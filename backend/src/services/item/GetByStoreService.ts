import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";

interface IGetStore {
  storeId: number;
}

export class GetStoreItemService {
  async execute({ storeId }: IGetStore) {
    try {
      validateFields({ storeId });
      const existingStore = await validateStore(storeId);

      const items = await prismaClient.item.findMany({
        where: { storeId: existingStore.id },
      });

      return items;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error getting store items'}`);
    }
  }
}