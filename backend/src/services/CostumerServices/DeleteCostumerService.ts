import prismaClient from "../../prisma";

export interface DeleteCostumerDTO {
  id: number;
  userId: number;
}

class DeleteCostumerService {
  async execute({ id, userId }: DeleteCostumerDTO) {

    if (!id || !userId) {
      throw new Error(`ID Inválido.`);
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId
      },
    });

    if (!findUser) {
      throw new Error("Cliente não encontrado.");

    } else {
      await prismaClient.costumer.delete({
        where: {
          id,
          userId
        },
      });
    }

    return { message: `O cliente foi deletado com sucesso!` };
  }
}

export { DeleteCostumerService };
