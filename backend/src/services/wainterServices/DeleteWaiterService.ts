import prismaClient from "../../prisma";

interface IDelWaiter {
  id: number;
}

class DeleteWaiterService {
  async execute({ id }: IDelWaiter) {
    
    if (!id) {
      throw new Error(`Id not found.`);
    }

    const findWaiter = await prismaClient.waiter.findFirst({
      where: {
        id,
      },
    });

    if (!findWaiter) {
      throw new Error("Waiter not found.")
    } else {

      await prismaClient.waiter.delete({
        where: {
          id: findWaiter?.id,
        },
      });
  
      return { message: `Waiter ${findWaiter.waiterName} deleted Successfully.` };
    }
  }
}

export { DeleteWaiterService };
