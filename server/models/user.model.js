import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        rememberToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)
export const User = mongoose.model("User", userSchema)