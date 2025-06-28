import mongoose from "mongoose"

type User = {
    name: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true,
        index: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        trim: true
    },
    email: {
        type: String, 
        required: true,
        unique: [true, 'Email already exists'],
        index: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        trim: true
    }
})

export const UserModel = mongoose.model("User",userSchema)