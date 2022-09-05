import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";

import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

interface User {
  name: string;
  about: string;
  avatar: string;
  id: string;
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).send(readFileData);
});


app.listen(3000);
