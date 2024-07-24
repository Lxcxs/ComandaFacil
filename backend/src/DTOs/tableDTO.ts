export interface CreateTableDTO {
  tableNumber: number;
  tablePeopleAmount: number;
  storeId: number;
  waiterId: number | null;
}