import prismaClient from "../../prisma";

export interface DeleteOrderDTO {
  id: number;
  userId: number;
  costumerId: number
}

class DeleteOrderService {
  async execute({ id, userId, costumerId }: DeleteOrderDTO) {

    if (!id || !userId) {
      throw new Error(`ID Inválido.`);
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId
      },
    });

    if (!findUser || !costumerId) {
      throw new Error("Usuário não encontrado.");

    } else {
      await prismaClient.order.delete({
        where: {
          id,
          userId,
          costumerId
        },
      });
    }

    return { message: `Pedido deletado com sucesso!` };
  }
}

export { DeleteOrderService };
