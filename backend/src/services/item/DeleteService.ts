import { validateStore } from "../../utils/validateStore";
import prismaClient from "../../prisma";

interface IDelete {
  id: number;
  storeId: number;
}

export class DeleteItemService {
  async execute({ id, storeId }: IDelete) {
    try {
      const existingStore = await validateStore(storeId);

      const findItem = await prismaClient.item.findFirst({
        where: {
          id,
          storeId: existingStore.id,
        }
      });

      if (!findItem) throw new Error("Service: Item not found.");

      await prismaClient.item.delete({
        where: {
          id,
          storeId: existingStore.id,
        }
      });

      return `Item ${findItem.itemName} was deleted successfully.`;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'Error deleting item'}`);
    }
  }
}
