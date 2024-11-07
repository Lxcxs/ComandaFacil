import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { itemDTO } from "../../DTOs/itemDTO";
import { Decimal } from "@prisma/client/runtime/library";
import { validateStore } from "../../utils/validateStore";

export class CreateItemService {
  async execute({
    name,
    description,
    price,
    status,
    image,
    categoryId,
    storeId
  }: itemDTO) {
    try {
      validateFields({ name, price, status, categoryId, storeId });
      await validateStore(storeId);

      const existingCategory = await prismaClient.category.findFirst({
        where: { id: categoryId }
      });

      if (!existingCategory) throw new Error("Service: Category not found.");

      const item = await prismaClient.item.create({
        data: {
          name,
          description: description || "no description",
          image: image || "no image available",
          status,
          price: new Decimal(price),
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
