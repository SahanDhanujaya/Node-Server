import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./mongo";
import rootRouter from "./routes/root.routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors"

dotenv.config();
const app = express();

const corsOption = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeader: ["Content-Type", "Authorization"]
}

app.use(cors(corsOption))
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


