import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";
const fs = require("fs");
const path = require("path");

const app = express();
app.use(json());

interface User {
  name: string;
  about: string;
  avatar: string;
  id: string;
}

const filePath: string = path.join(__dirname, "../data/data.json");
const readFileData: User[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send(readFileData);
});


app.listen(3000);
