import { NextFunction, Request, Response } from "express";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['Authorization'] as string;
  const token = authHeader ? authHeader.split(' ')[1];
  if (token === null) return res.status(401);
  jwt.

    next();
}

function generateAccessTocket(user: { username: string, password: string }): void {
  return jwt.sign(user, process.env.)
}
