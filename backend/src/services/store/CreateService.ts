import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";

interface CreateStoreDTO {
  storeName: string;
  storeImage: string;
  storeTableAmount: number;
  userId: number;
}

export class CreateStoreService {
  async execute({ storeName, storeImage, storeTableAmount, userId }: CreateStoreDTO) {
    try {
      validateFields({ storeName, storeImage, storeTableAmount, userId });

      const store = await prismaClient.store.create({
        data: {
          storeName,
          storeImage: storeImage || "no image available",
          storeTableAmount,
          storeStatus: "offline",
          userId,
        },
      });

      return store;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error creating store'}`);
    }
  }
}
