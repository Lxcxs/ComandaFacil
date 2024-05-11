import prismaClient from "../../prisma";

interface UpdateItemDTO {
  id: number;
  itemName: string;
  itemDescription: string;
  itemValue: number;
  userId: number;
}

class UpdateItemService {
  async execute({ id, itemName, itemDescription, itemValue, userId }: UpdateItemDTO) {

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      throw new Error("Usuário não Encontrado.");

    } else {
      await prismaClient.item.update({
        where: {
          id,
          userId: findUser.id,
        },
        data: {
          itemName,
          itemDescription,
          itemValue
        },
      });

      return { message: "Item Atualizado!" };
    }
  }
}

export { UpdateItemService };
