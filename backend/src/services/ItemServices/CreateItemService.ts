import prismaClient from "../../prisma";

interface CreateItemDTO {
  itemName: string;
  itemDescription: string;
  itemValue: number;
  userId: number;
  categoryId: number;
}

class CreateItemService {
  async execute({ itemName, itemDescription, itemValue, userId, categoryId }: CreateItemDTO) {

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    if ( !itemName || !itemDescription || !itemValue || !userId || !categoryId ) {
      throw new Error("Preencha todos os campos");
    }

    if (!findUser) {
      throw new Error("Usuário não encontrado.");
      
    } else {

      const item = await prismaClient.item.create({
        data: {
          itemName,
          itemDescription,
          itemValue,
          categoryId,
          userId
        },
      });

      return item;
    }
  }
}

export { CreateItemService };
