import prismaClient from "../../prisma";

export class GetCategoryService {
  async execute() {
    try {
      const categories = await prismaClient.category.findMany();
      return categories;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error getting categories'}`);
    }
  }
}