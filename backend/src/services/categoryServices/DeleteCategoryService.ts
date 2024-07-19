import prismaClient from "../../prisma";

interface IDelete {
  id: number;
}

class DeleteCategoryService {
  async execute({ id }: IDelete) {

    const existingCategory = await prismaClient.category.findFirst({
      where: {
        id
      }
    });
  
    if (!existingCategory) throw new Error("Service: Category not found;");
  
    await prismaClient.category.delete({
      where: {
        id: existingCategory.id
      }
    });
  
    return (`Category "${existingCategory.categoryName}" was deleted successfully.`)
  }
}
export { DeleteCategoryService };