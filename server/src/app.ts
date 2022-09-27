import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { startDB } from "./db/database";
import loginRouter from "./routes/loginRoutes";
import registerRouter from "./routes/registerRoutes";
const app = express();
app.use(json());
app.use(cors());


// Middleware for authenticating a user
app.use(loginRouter);
app.use(registerRouter);


app.listen(process.env.PORT, async () => {
    await startDB();
});
