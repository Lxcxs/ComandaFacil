
import prismaClient from "../../prisma";

class GetCategoryService {
  async execute() {
    
    const result = await prismaClient.category.findMany();

    return result;
  }
}

export { GetCategoryService };
