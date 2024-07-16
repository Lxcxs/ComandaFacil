import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../autentication/Auth";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(' ')[1];

  const token = authHeader;
  // console.log(token)

  if (!token) return res.sendStatus(401);

  const userId = verifyToken(token);

  if (!userId) return res.sendStatus(403);

  req.user = userId;
  next();
};
