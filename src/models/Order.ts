import mongoose, {Schema} from "mongoose";

export type OrderItem = {
    itemId: mongoose.Types.ObjectId
    itemName: string
    price: number
    quantity: number
    subtotal: number
}

export type Order = {
    customerId: mongoose.Types.ObjectId
    customerName: string
    items: OrderItem[]
    total: number
    date: string
    status: "pending" | "completed" | "cancelled"
}

const orderItemSchema = new Schema<OrderItem>(
    {
        itemId: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },
        itemName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        }
    },
    {
        _id: false,
    }
)

const orderSchema = new Schema<Order>(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },
        customerName: {
            type: String,
            required: true
        },
        items: {
            type: [orderItemSchema],
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"]
        }
    }
)
