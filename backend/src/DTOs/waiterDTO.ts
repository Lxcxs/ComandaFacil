import { JwtHeader, JwtPayload } from "jsonwebtoken";

export interface CreateWaiterDTO {
  name: string;
  email: string;
  password: string;
  storeId: number;
  token: JwtPayload | null;
}