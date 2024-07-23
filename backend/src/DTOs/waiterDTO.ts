import { JwtHeader, JwtPayload } from "jsonwebtoken";

export interface CreateWaiterDTO {
  waiterName: string;
  waiterEmail: string;
  waiterPassword: string;
  storeId: number;
  token: JwtPayload | null;
}