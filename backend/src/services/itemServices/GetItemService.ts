import prismaClient from "../../prisma";

class GetItemService {
  async execute() {
    const items = await prismaClient.item.findMany();

    return items;
  }
}
export { GetItemService };
