import { Router } from "express";
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "../controllers/customer.controller";

const customerRouter = Router();
customerRouter.post('/',createCustomer)
customerRouter.get('/',getCustomers)
customerRouter.get('/:id',getCustomer)
customerRouter.delete('/:id',deleteCustomer)
customerRouter.put('/:id',updateCustomer)

export default customerRouter
