import prismaClient from "../../prisma";

interface CreateStoreDTO {
  storeName: string;
  storeImage: string;
  storeTableAmount: number;
  userId: number;
}


class CreateStoreService {
  async execute({ storeName, storeImage, storeTableAmount, userId }: CreateStoreDTO) {

    const status: string = "offline"

    if (!storeName || !storeTableAmount || !userId ) {
      throw new Error("Error: Please fill in all fields");
    }

    const store = await prismaClient.store.create({
      data: {
        storeName,
        storeImage,
        storeTableAmount,
        storeStatus: status,
        userId
      },
    });

    return store;
  }
}

export { CreateStoreService };
