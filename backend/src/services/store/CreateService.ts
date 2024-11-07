import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";

interface CreateStoreDTO {
  name: string;
  image: string;
  tableCount: number;
  userId: number;
}

export class CreateStoreService {
  async execute({ name, image, tableCount, userId }: CreateStoreDTO) {
    try {
      validateFields({ name, image, tableCount, userId });

      const store = await prismaClient.store.create({
        data: {
          name,
          image: image || "no image available",
          tableCount,
          status: "online",
          userId,
        },
      });

      return store;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error creating store'}`);
    }
  }
}
