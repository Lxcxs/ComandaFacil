import prismaClient from "../../prisma";

export interface CreateCategoryDTO {
  categoryName: string;
  userId: number;
}

class CreateCategoryService {
  async execute({ categoryName, userId }: CreateCategoryDTO) {

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    if ( !categoryName || !userId ) {
      throw new Error("Preencha todos os campos");
    }

    if (!findUser) {
      throw new Error("Usuário não encontrado.");
    } else {
      const user = await prismaClient.category.create({
        data: {
          categoryName,
          userId
        },
      });

      return user;
    }
  }
}

export { CreateCategoryService };
