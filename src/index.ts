import express, { Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();
const PORT: number = 5000;

app.use(cors());
app.use(express.json());

app.use("/notes", router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
