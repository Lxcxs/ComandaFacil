import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";

interface CreateStoreDTO {
  storeName: string;
  storeImage: string;
  storeTableAmount: number;
  userId: number;
}
class CreateStoreService {
  async execute({ storeName, storeImage, storeTableAmount, userId }: CreateStoreDTO) {

    validateFields({ storeName, storeImage, storeTableAmount, userId });

    const store = await prismaClient.store.create({
      data: {
        storeName,
        storeImage: storeImage || "no image available",
        storeTableAmount,
        storeStatus: "offline",
        userId
      },
    });

    return store;
  }
}

export { CreateStoreService };
