import { Decimal } from "@prisma/client/runtime/library";

interface OrderDTO {
  price: number;
  id: number;
  itemName: string;
  itemImage: string;
  quantity: number;
  customerNote: string;
  status: string;
  createdAt: Date;
  storeId: number;
  customerId: number;
  tableId: number | null;
  customerTabId: number | null;
  waiterId: number | null;
}
export { OrderDTO };
