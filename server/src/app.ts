import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { json } from "body-parser";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import { FlightSearchRoutes } from "./routes/flightSearchRoutes";

const app = express();
app.use(json());
app.use(cors());

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader ? authHeader.split(' ')[1];
  if (token === null) return res.status(401);
  jwt.
}

function generateAccessTocket(user: { username: string, password: string}): void {
  return jwt.sign(user, process.env.)
}

// Middleware for authenticating a user
app.use(authenticateToken);

// Routes


app.listen(3000);
