import mongoose from "mongoose"

type Item = {
    name: string,
    price: number
}

const itemSchema = new mongoose.Schema<Item>({
    name: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
   })

export const ItemModel = mongoose.model('Item', itemSchema)