import prismaClient from "../../prisma";

interface IDelWaiter {
  id: number;
}

export class DeleteWaiterService {
  async execute({ id }: IDelWaiter) {
    try {
      if (!id) {
        throw new Error("Service: Id not found.");
      }

      const findWaiter = await prismaClient.waiter.findFirst({
        where: { id },
      });

      if (!findWaiter) {
        throw new Error("Service: Waiter not found.");
      }

      await prismaClient.waiter.delete({
        where: { id: findWaiter.id },
      });

      return { message: `Waiter ${findWaiter.waiterName} deleted successfully.` };
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error deleting waiter'}`);
    }
  }
}
