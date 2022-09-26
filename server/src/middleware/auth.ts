import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | jwt.JwtPayload
  }
  interface Response {
    user?: string
  }
}


function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader.split(' ')[1];
  
  if (token === null) return res.status(401);
  jwt.verify(token, process.env['ACCESS_TOKEN_SECRET'] as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
  });

  next();
}
