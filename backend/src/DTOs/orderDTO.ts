import { Decimal } from "@prisma/client/runtime/library";

interface OrderDTO {
  id: number;
  itemName: string;
  itemImage: string;
  itemAmount: number;
  costumerNote: string;
  orderValue: number;
  orderStatus: string;
  createdAt: Date;
  storeId: number;
  costumerId: number;
  tableId: number | null;
  costumerTabId: number | null;
  waiterId: number | null;
}
export { OrderDTO };