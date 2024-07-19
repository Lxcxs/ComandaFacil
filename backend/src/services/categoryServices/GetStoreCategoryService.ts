import prismaClient from "../../prisma";

interface IGetCategory {
  storeId: number;
}

class GetStoreCategoryService {
  async execute({ storeId }: IGetCategory) {
    const existingStore = await prismaClient.store.findUnique({
      where: {
        id: storeId,
      }
    });

    if (!existingStore) throw new Error("Service: Store not found.");

    const categories = await prismaClient.category.findMany({
      where: {
        storeId: existingStore.id,
      }
    });

    return categories;
  }
}
export { GetStoreCategoryService };