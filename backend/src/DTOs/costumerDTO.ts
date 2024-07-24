export interface CreateCostumerDTO {
  storeId: number;
  costumerName: string;
  tableNumber: number;
  tablePeopleAmount: number;
  waiterId: number | null;
}