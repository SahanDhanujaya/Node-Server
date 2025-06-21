import mongoose from "mongoose"

type Customer = {
    name: string,
    email: string,
    phone: string,
    address: string
}

const customerSchema = new mongoose.Schema<Customer>({
    name: {
        type: String,
        minlength: [2, 'Name must be at least 2 characters long'],
        trim: true,
        required: [true, 'Name is required' ]
    },
    email: {
        type: String, 
        required: true,
        unique: [true, 'Email already exists'],
        index: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        minlength: [10, 'Phone number must be at least 10 characters long'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minlength: [5, 'Address must be at least 5 characters long']
    }
})

export const CustomerModel = mongoose.model("Customer",customerSchema)