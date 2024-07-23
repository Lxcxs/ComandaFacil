import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../autentication/Auth";

function findHeaders(req: Request, headerName: string): JwtPayload | null {
  const authHeader = req.headers[headerName];

  if (!authHeader) {
    console.error("Header not found:", headerName);
    return null;
  }

  const token = (authHeader as string).replace("Bearer ", "");

  if (!token) {
    console.error("Token not found after replacement");
    return null;
  }

  try {
    const decodedToken: JwtPayload | null = verifyToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export { findHeaders };
