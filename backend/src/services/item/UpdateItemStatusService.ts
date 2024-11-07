import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";

export class UpdateItemStatusService {
  async execute({
    id,
    storeId,
    status
  }: { id: number; storeId: number, status: string }) {
    try {
      validateStore(storeId);

      const existingItem = await prismaClient.item.findFirst({
        where: { id, storeId }
      });

      if (!existingItem) throw new Error("Service: Item not found.");

      const updatedItem = await prismaClient.item.update({
        where: { id },
        data: {
          status: status
        }
      });

      return updatedItem;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'Error updating item status'}`);
    }
  }
}
