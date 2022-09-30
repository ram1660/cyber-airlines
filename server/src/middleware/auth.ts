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


export function authenticateAirlineToken(req: Request, res: Response, next: NextFunction) {
  const token = getAccessToken(req);
  if (token === null) return res.status(400);
  jwt.verify(token, process.env['AIRLINE_TOKEN_SECRET'] as string, (err, user) => {
    if (err) return res.status(403).json({message: 'Invalid access.'});
    req.user = user;
    next();
  });

}

export function authenticateCustomerToken(req: Request, res: Response, next: NextFunction) {
  const token = getAccessToken(req);
  if (token === null) return res.status(400).json({message: 'Invalid access.'});
  jwt.verify(token, process.env['CUSTOMER_TOKEN_SECRET'] as string, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid access.'});
    req.user = user;
    next();
  });

}

function getAccessToken(req: Request): string {
  return (req.headers['authorization'] as string).split(' ')[1];
}