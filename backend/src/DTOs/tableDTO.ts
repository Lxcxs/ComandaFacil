export interface CreateTableDTO {
  tableNumber: string;
  tablePeopleAmount: number;
  storeId: number;
  waiterId: number | null;
}