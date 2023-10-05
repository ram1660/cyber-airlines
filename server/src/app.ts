import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { startDB } from "./db/database";
import loginRouter from "./routes/loginRoutes";
import registerRouter from "./routes/registerRoutes";
import searchRouter from "./routes/flightSearchRoutes";
import * as dotenv from 'dotenv';
import profileRouter from "./routes/profileRoutes";
import airlineAccountRouter from "./routes/airlinesAccountOperationsRoutes";

export default interface Response {
    message: string | any;
    code: number;
};

dotenv.config();
const app = express();
app.use(json());
app.use(cors());


// Middleware for authenticating a user
app.use(loginRouter);
app.use(registerRouter);
app.use(searchRouter);
app.use(profileRouter);
app.use(airlineAccountRouter);


app.listen(process.env.PORT, async () => {
    console.log('Starting server.');
    console.log('Reading dotEnv file...');
    console.log('Grabbing checking tokens existents..');
    if (process.env['CUSTOMER_TOKEN_SECRET'] === undefined) {
        throw Error('No customer token. Please add the key "CUSTOMER_TOKEN_SECRET" with any value you would like to the .env file.');
    }
    if (process.env['AIRLINE_TOKEN_SECRET'] === undefined) {
        throw Error('No customer token. Please add the key "AIRLINE_TOKEN_SECRET" with any value you would like to the .env file.');
    }
    if (process.env['PORT'] === undefined) {
        console.warn('No port number specified! The defualt port the client uses is: 3000. Please enter that port into .env or change it in the the client and .env if you want to use other ports.');
    }
    console.log('Found secret tokens.');
    await startDB();
    console.log('Database started.');
    console.log('Starting server at http://localhost:' + process.env['PORT'] as string);

});
