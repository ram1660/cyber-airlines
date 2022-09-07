import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { json } from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import { FlightSearchRoutes } from "./routes/flightSearchRoutes";
import { startDB } from "./db/database";
import router from "./routes/userControlRoutes";
const app = express();
app.use(json());
app.use(cors());


// Middleware for authenticating a user
app.use(router);

// Routes


app.listen(process.env.PORT, async () => {
    await startDB();
});
