import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomerModel } from "../models/customer";
import mongoose from "mongoose";
import { ApiError } from "../errors/ApiError";

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = new CustomerModel(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error: any) {
    if (error instanceof mongoose.Error) {
      next(error);
    }
  }
};

export const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await CustomerModel.find();
    res.status(200).json(customer);
  } catch (error: any) {
    next(error);
    return;
  }
  res.status(500).json({ message: "Internal server error" });
};

export const getCustomer = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }
    
    resp.status(200).json(customer);
  } catch (error: any) {
    next(error);
    return;
  }
  resp.status(500).json({ message: "Internal server error" });
};

export const deleteCustomer = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const deletedCustomer = await CustomerModel.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      throw new ApiError(404, "Customer not found");
    }
    resp.status(200).json({deletedCustomer: deletedCustomer, message: "Customer deleted successfully"});
  } catch (error: any) {
    next(error);
    return;
  }
  resp.status(500).json({ message: "Internal server error" });
}

export const updateCustomer = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true} ); // return the updated customer from new: true, validate the updated data from runValidators: true
    if (!updatedCustomer) {
      throw new ApiError(404, "Customer not found");
    }
    resp.status(200).json({updatedCustomer: updatedCustomer, message: "Customer updated successfully"});
  } catch (error) {
    next(error)
    return
  }
  resp.status(500).json({ message: "Internal server error" });
}