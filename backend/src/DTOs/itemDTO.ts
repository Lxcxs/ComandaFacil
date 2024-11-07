import { Decimal } from "@prisma/client/runtime/library";

export interface itemDTO {
  name: string;
  description: string;
  price: Decimal;
  status: string;
  image: string;
  storeId: number;
  categoryId: number;
}