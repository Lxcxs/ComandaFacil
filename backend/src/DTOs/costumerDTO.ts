export interface CreateCostumerDTO {
  storeId: number;
  name: string;
  tableNumber: number;
  tablePeopleAmount: number;
  waiterId: number | null;
}