import prismaClient from "../../prisma";

interface IDelete {
  id: number;
  storeId: number;
}

class DeleteItemService {
  async execute({ id, storeId }: IDelete) {
    const existingStore = await prismaClient.store.findUnique({
      where: {
        id: storeId,
      }
    });
    if (!existingStore) throw new Error("Service: store not found.");

    const findItem = await prismaClient.item.findUnique({
      where: {
        id,
        storeId: existingStore.id,
      }
    })

    await prismaClient.item.delete({
      where: {
        id,
        storeId
      }
    });

    return `Item ${findItem?.itemName} was deleted successfully.`
  }
}
export { DeleteItemService };