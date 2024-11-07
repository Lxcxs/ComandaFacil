import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { itemDTO } from "../../DTOs/itemDTO";
import { Decimal } from "@prisma/client/runtime/library";
import { validateStore } from "../../utils/validateStore";

export class UpdateItemService {
  async execute({
    id,
    name,
    description,
    price,
    storeId
  }: Partial<itemDTO> & { id: number }) {
    try {
      validateFields({ name, price, storeId });
      await validateStore(storeId as number);

      const existingItem = await prismaClient.item.findFirst({
        where: { id, storeId }
      });

      if (!existingItem) throw new Error("Service: Item not found.");

      const updatedItem = await prismaClient.item.update({
        where: { id },
        data: {
          name,
          description: description || existingItem.description,
          price: price !== undefined ? new Decimal(price) : existingItem.price
        }
      });

      return updatedItem;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'Error updating item'}`);
    }
  }
}
