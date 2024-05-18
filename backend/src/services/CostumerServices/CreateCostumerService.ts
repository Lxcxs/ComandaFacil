import prismaClient from "../../prisma";

export interface CreateCostumerDTO {
  costumerName: string;
  costumerTable: number;
  userId: number;
}

class CreateCostumerService {
  async execute({ costumerName, costumerTable, userId }: CreateCostumerDTO) {
    const tables:number[] = []

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });


    if ( !costumerName || !costumerTable || !userId ) {
      throw new Error("Preencha todos os campos");
    }

    if (!findUser) {
      throw new Error("Usuário não encontrado.");
      
    } else {

      for(let i = 0; i < findUser.userTableAmount; i++) {
        tables.push(i + 1)
      }
      
      if( tables.includes(costumerTable)) {
        const user = await prismaClient.costumer.create({
          data: {
            costumerName,
            costumerTable,
            userId
          },
        });
  
        return user;

      } else {
        
        throw new Error("Essa mesa não existe no sistema.")
      }


    }
  }
}

export { CreateCostumerService };
