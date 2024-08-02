import { categoryDTO } from "../../DTOs/categoryDTO";
import prismaClient from "../../prisma";

export class CreateCategoryService {
  async execute({ categoryName, storeId }: categoryDTO) {
    try {
      const existingStore = await prismaClient.store.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!existingStore) throw new Error("Service: Store not found.");

      return await prismaClient.category.create({
        data: {
          categoryName,
          storeId: existingStore.id,
        }
      });
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error creating category'}`);
    }
  }
}