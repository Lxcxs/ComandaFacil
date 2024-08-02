import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { itemDTO } from "../../DTOs/itemDTO";
import { Decimal } from "@prisma/client/runtime/library";
import { validateStore } from "../../utils/validateStore";

export class CreateItemService {
  async execute({
    itemName,
    itemDescription,
    itemValue,
    itemStatus,
    itemImage,
    categoryId,
    storeId
  }: itemDTO) {
    try {
      validateFields({ itemName, itemDescription, itemValue, itemStatus, categoryId, storeId });
      await validateStore(storeId);

      const existingCategory = await prismaClient.category.findFirst({
        where: { id: categoryId }
      });

      if (!existingCategory) throw new Error("Service: Category not found.");

      const item = await prismaClient.item.create({
        data: {
          itemName,
          itemDescription,
          itemImage: itemImage || "no image available",
          itemStatus,
          itemValue: new Decimal(itemValue),
          storeId,
          categoryId
        }
      });

      return item;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'Error creating item'}`);
    }
  }
}
