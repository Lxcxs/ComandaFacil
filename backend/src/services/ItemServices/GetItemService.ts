
import prismaClient from "../../prisma";

interface GetItemDTO {
  userId: number
}

class GetItemService {
  async execute({ userId }: GetItemDTO) {
    
    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId
      }
    })


    if (!findUser) {
      throw new Error("Usuário não encontrado.")

    } else {
  
      const result = await prismaClient.item.findMany({
        where: {
          userId: findUser.id
        }
      });

      return result;
    }

  }
}

export { GetItemService };
