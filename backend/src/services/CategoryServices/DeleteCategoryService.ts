import prismaClient from "../../prisma";

export interface DeleteCategoryDTO {
  id: number;
}

class DeleteCategoryService {
  async execute({ id }: DeleteCategoryDTO) {

    if (!id) {
      throw new Error(`ID Inválido.`);
    }

    const findCategory = await prismaClient.category.findFirst({
      where: {
        id
      },
    });

    if (!findCategory) {
      throw new Error("Categoria não encontrada.");
    } else {
      await prismaClient.category.delete({
        where: {
          id: findCategory?.id,
        },
      });
    }

    return { message: `A categoria "${findCategory.categoryName}" foi deletada com sucesso!` };
  }
}

export { DeleteCategoryService };
