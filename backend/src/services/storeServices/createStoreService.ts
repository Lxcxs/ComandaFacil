import prismaClient from "../../prisma";

interface CreateStoreDTO {
  storeName: string;
  storeImage: string;
  storeTableAmount: number;
  userId: number;
}
class CreateStoreService {
  async execute({ storeName, storeImage, storeTableAmount, userId }: CreateStoreDTO) {

    const status: string = "offline";
    let imageUrl: string = "";

    if (!storeName || !storeTableAmount || !userId ) {
      throw new Error("Error: Please fill in all fields");
    }

    if (storeImage === "") {
      imageUrl = "no image";
    } else {
      imageUrl = storeImage
    }

    const store = await prismaClient.store.create({
      data: {
        storeName,
        storeImage: imageUrl,
        storeTableAmount,
        storeStatus: status,
        userId
      },
    });

    return store;
  }
}

export { CreateStoreService };
