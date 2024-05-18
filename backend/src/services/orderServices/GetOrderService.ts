import prismaClient from "../../prisma";

interface GetOrderDTO {
  userId: number;
}

class GetOrderService {
  async execute({ userId }: GetOrderDTO) {
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!findUser ) {
      throw new Error("Usuário não encontrado.");

    } else {
      const result = await prismaClient.order.findMany({
        where: {
          userId: findUser.id
        },
      });

      return result;
    }
  }
}

export { GetOrderService };
