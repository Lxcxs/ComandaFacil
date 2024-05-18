
import prismaClient from "../../prisma";

interface GetCostumerDTO {
  userId: number
}


class GetCostumerService {
  async execute({ userId }: GetCostumerDTO) {
    
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId
      }
    })


    if (!findUser) {
      throw new Error("Usuário não encontrado.")

    } else {
  
      const result = await prismaClient.costumer.findMany({
        where: {
          userId: findUser.id
        }
      });

      return result;
    }

  }
}

export { GetCostumerService };
