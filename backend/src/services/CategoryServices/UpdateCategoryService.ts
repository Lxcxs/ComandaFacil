import prismaClient from "../../prisma";

interface UpdateCategoryDTO {
  id: number;
  categoryName: string;
  userId: number;
}

class UpdateCategoryService {
  async execute({ id, categoryName, userId }: UpdateCategoryDTO) {
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        categoryName,
      },
    });
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (categoryAlreadyExists) {
      throw new Error("Já existe uma categoria com este nome.");
    }
    if (!findUser) {
      throw new Error("Usuário não Encontrado.");

    } else {
      await prismaClient.category.update({
        where: {
          id,
          userId,
        },
        data: {
          categoryName,
        },
      });

      return { message: "Categoria Atualizada!" };
    }
  }
}

export { UpdateCategoryService };
