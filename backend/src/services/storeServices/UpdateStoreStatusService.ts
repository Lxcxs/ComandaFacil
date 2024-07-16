import prismaClient from "../../prisma";

interface IStatus {
  id: number;
  userId: number;
}

class UpdateStoreStatusService {
  async execute({ id, userId }: IStatus) {

    if (!id || !userId ) {
      throw new Error("Missing required parameters.");
    }

    const user = await prismaClient.user.findFirst({
      where: { id: userId }
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const store = await prismaClient.store.findUnique({
      where: { id }
    });

    if (!store) {
      throw new Error("Store not found.");
    }

    const newStatus = store.storeStatus === "offline" ? "online" : "offline";

    await prismaClient.store.update({
      where: { id: store.id },
      data: { storeStatus: newStatus }
    });

    return { message: `The store status has been updated to ${newStatus}.` };
  }
}

export { UpdateStoreStatusService };
