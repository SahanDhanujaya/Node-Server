import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./mongo";
import rootRouter from "./routes/root.routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();
app.use(express.json());
// localhost:3000

const PORT = process.env.PORT;

app.use("/api", rootRouter);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world 1");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
