import { Router } from "express";
import customerRouter from "./customer.routes";
import itemRouter from "./item.routes";

const rootRouter = Router();
rootRouter.use('/customers',customerRouter)
rootRouter.use('/items', itemRouter)

export default rootRouter