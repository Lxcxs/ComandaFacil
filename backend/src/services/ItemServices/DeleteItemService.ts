import prismaClient from "../../prisma";

interface DeleteItemDTO {
  id: number;
  userId: number;
}

class DeleteItemService {
  async execute({ id, userId }: DeleteItemDTO) {

    if (!id) {
      throw new Error(`ID Inválido.`);
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId
      },
    });
    const item = await prismaClient.item.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!findUser) {
      throw new Error("Usuário não econtrado.");

    } else {

      await prismaClient.item.delete({
        where: {
          id,
          userId: findUser.id
        },
      });
    }

    return { message: `O Item "${item?.itemName}" foi deletado com sucesso!` };
  }
}

export { DeleteItemService };
