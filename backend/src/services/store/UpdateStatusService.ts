import prismaClient from "../../prisma";

interface IStatus {
  id: number;
  userId: number;
}

export class UpdateStoreStatusService {
  async execute({ id, userId }: IStatus) {
    try {
      if (!id || !userId) {
        throw new Error("Service: Missing required parameters.");
      }

      const user = await prismaClient.user.findFirst({ where: { id: userId } });
      if (!user) {
        throw new Error("Service: User not found.");
      }

      const store = await prismaClient.store.findUnique({ where: { id } });
      if (!store) {
        throw new Error("Service: Store not found.");
      }

      const newStatus = store.storeStatus === "offline" ? "online" : "offline";

      await prismaClient.store.update({
        where: { id: store.id },
        data: { storeStatus: newStatus },
      });

      return { message: `The store status has been updated to ${newStatus}.` };
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating store status'}`);
    }
  }
}
