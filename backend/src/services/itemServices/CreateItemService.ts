import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { itemDTO } from "../../DTOs/itemDTO";
import { Decimal } from "@prisma/client/runtime/library";
import { validateStore } from "../../utils/validateStore";

class CreateItemService {
  async execute({ itemName, itemDescription, itemValue, itemStatus, itemImage, categoryId, storeId }: itemDTO) {
    
    validateFields( {itemName, itemDescription, itemValue, itemStatus, categoryId, storeId} );
    await validateStore(storeId);
    
    const existingCategory = await prismaClient.category.findFirst({
      where: {
        id: categoryId
      }
    })
    if (!existingCategory) throw new Error("Service: category not found.");

    const item = await prismaClient.item.create({
      data: {
        itemName,
        itemDescription,
        itemImage: itemImage || "no image available",
        itemStatus,
        itemValue: new Decimal(itemValue),
        storeId,
        categoryId,
      }
    });

    return item;
  }
}
export { CreateItemService };