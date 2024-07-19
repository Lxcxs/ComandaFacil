import prismaClient from "../../prisma";

class GetCategoryService {
  async execute() {
    const categories = await prismaClient.category.findMany();
    
    return categories;
  }
}
export { GetCategoryService };