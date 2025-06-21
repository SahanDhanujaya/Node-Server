import { NextFunction, Request, Response } from "express";
import { ItemModel } from "../models/item";
import mongoose from "mongoose";
import { ApiError } from "../errors/ApiError";

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = new ItemModel(req.body);
    await item.save();
    res.status(201).json({ message: "Item created successfully" });
  } catch (error: any) {
    if (error instanceof mongoose.Error) {
      next(error);
      return;
    }
  }
  res.status(500).json({ message: "Internal server error" });
};

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (error: any) {
    next(error);
    return;
  }
  res.status(500).json({ message: "Internal server error" });
};

export const getItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await ItemModel.findById(req.params.id);
    if (!item) {
      throw new ApiError(404, "Item not found");
    }
    res.status(200).json(item);
  } catch (error: any) {
    next(error);
    return;
  }
  res.status(500).json({ message: "Internal server error" });
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ); // return the updated item from new: true, validate the updated data from runValidators: true
    if (!updatedItem) {
      throw new ApiError(404, "Item not found");
    }
    res.status(200).json({ updatedItem: updatedItem, message: "Item updated successfully" });
  } catch (error) {
    next(error);
    return;
  }
  res.status(500).json({ message: "Internal server error" });
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedItem = await ItemModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      throw new ApiError(404, "Item not found");
    }
    res.status(200).json({ deletedItem: deletedItem, message: "Item deleted successfully" });
  } catch (error: any) {
    next(error);
    return;
  }
  res.status(500).json({ message: "Internal server error" });
};

