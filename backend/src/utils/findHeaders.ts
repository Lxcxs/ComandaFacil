import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../autentication/Auth";

export function findHeaders(req: Request, headerName: string): JwtPayload {
  const authHeader = req.headers[headerName];

  if (!authHeader) {
    throw new Error(`Header not found: ${headerName}`);
  }

  const token = (authHeader as string).replace("Bearer ", "");

  if (!token) {
    throw new Error("Token not found after replacement");
  }

  try {
    const decodedToken: JwtPayload | null = verifyToken(token);
    if (!decodedToken) {
      throw new Error("Invalid token");
    }
    return decodedToken;
  } catch (error) {
    throw new Error(`Invalid token: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`);
  }
}
