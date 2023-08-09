import express, { Express } from "express";
import cors from "cors";
import router from "./routes";
import { db } from "./sequalizeDB";

const app: Express = express();
const PORT: number = 5000;

app.use(cors());
app.use(express.json());

app.use("/notes", router);

const start = async () => {
  try {
    await db.sync({ force: false });
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
