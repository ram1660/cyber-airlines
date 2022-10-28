import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { startDB } from "./db/database";
import loginRouter from "./routes/loginRoutes";
import registerRouter from "./routes/registerRoutes";
import searchRouter from "./routes/flightSearchRoutes";
import * as dotenv from 'dotenv';
import profileRouter from "./routes/profileRoutes";
dotenv.config();
const app = express();
app.use(json());
app.use(cors());


// Middleware for authenticating a user
app.use(loginRouter);
app.use(registerRouter);
app.use(searchRouter);
app.use(profileRouter);

app.listen(process.env.PORT, async () => {
    await startDB();
    console.log('Database started.');
    console.log('Starting server at http://localhost:' + process.env['PORT'] as string);
    
});
