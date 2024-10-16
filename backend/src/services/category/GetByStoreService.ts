import prismaClient from "../../prisma";

interface IGetCategory {
  storeId: number;
}

export class GetStoreCategoryService {
  async execute({ storeId }: IGetCategory) {
    try {
      const existingStore = await prismaClient.store.findFirst({ where: { id: storeId } });
      if (!existingStore) throw new Error("Service: Store not found.");

      return await prismaClient.category.findMany({ where: { storeId } });
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'Error getting categories'}`);
    }
  }
}
