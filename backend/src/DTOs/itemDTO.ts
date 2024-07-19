import { Decimal } from "@prisma/client/runtime/library";

export interface itemDTO {
  itemName: string;
  itemDescription: string;
  itemValue: Decimal;
  itemStatus: string;
  itemImage: string;
  storeId: number;
  categoryId: number;
}