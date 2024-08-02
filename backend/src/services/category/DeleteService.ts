import prismaClient from "../../prisma";

interface IDelete {
  id: number;
}

export class DeleteCategoryService {
  async execute({ id }: IDelete) {
    try {
      const existingCategory = await prismaClient.category.findFirst({
        where: { id }
      });

      if (!existingCategory) throw new Error("Service: Category not found.");

      await prismaClient.category.delete({
        where: { id: existingCategory.id }
      });

      return `Category "${existingCategory.categoryName}" was deleted successfully.`;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error deleting category'}`);
    }
  }
}