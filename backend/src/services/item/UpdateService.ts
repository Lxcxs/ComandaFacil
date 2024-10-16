import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { itemDTO } from "../../DTOs/itemDTO";
import { Decimal } from "@prisma/client/runtime/library";
import { validateStore } from "../../utils/validateStore";

export class UpdateItemService {
  async execute({
    id,
    itemName,
    itemDescription,
    itemValue,
    storeId
  }: Partial<itemDTO> & { id: number }) {
    try {
      validateFields({ itemName, itemValue, storeId });
      await validateStore(storeId as number);

      const existingItem = await prismaClient.item.findFirst({
        where: { id, storeId }
      });

      if (!existingItem) throw new Error("Service: Item not found.");

      const updatedItem = await prismaClient.item.update({
        where: { id },
        data: {
          itemName,
          itemDescription: itemDescription || existingItem.itemDescription,
          itemValue: itemValue !== undefined ? new Decimal(itemValue) : existingItem.itemValue
        }
      });

      return updatedItem;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'Error updating item'}`);
    }
  }
}
