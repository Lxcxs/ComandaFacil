import prismaClient from "../../prisma";

export interface CreateOrderDTO {
  name: string;
  value: number;
  quantity: number;
  note: string;
  costumerName: string;
  userId: number;
  costumerId: number;
}

class CreateOrderService {
  async execute({ name, value, quantity, note, userId, costumerId }: CreateOrderDTO) {

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });
    const findCostumer = await prismaClient.costumer.findFirst({
      where: {
        id: costumerId
      }
    })

    if ( !name || !quantity || !value || !userId || !costumerId) {
      throw new Error("Preencha todos os campos");
    }

    if (note === '') note = 'Nenhuma observação'
    
    if (!findUser || !findCostumer) {
      throw new Error("Usuário não encontrado.");

    } else {

      const totalValue = value * quantity
      const user = await prismaClient.order.create({
        data: {
          name,
          costumerName: findCostumer.costumerName,
          quantity,
          value: totalValue,
          note,
          userId,
          costumerId,
          description: ''
        },
      });

      return user;
    }
  }
}

export { CreateOrderService };
