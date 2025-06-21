import { Router } from "express";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/item.controller";

const itemRouter = Router();
itemRouter.post('/', createItem)
itemRouter.get('/', getItems)
itemRouter.get('/:id', getItem)
itemRouter.delete('/:id', deleteItem)
itemRouter.put('/:id', updateItem)

export default itemRouter
