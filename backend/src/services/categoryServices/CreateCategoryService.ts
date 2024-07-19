import { categoryDTO } from "../../DTOs/categoryDTO";
import prismaClient from "../../prisma";

class CreateCategoryService {
  async execute({ categoryName, storeId }: categoryDTO) {
    const existingStore = await prismaClient.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!existingStore) throw new Error("Service: Store not found.");

    return prismaClient.category.create({
      data: {
        categoryName,
        storeId: existingStore.id,
      }
    });
  }
}
export { CreateCategoryService };
