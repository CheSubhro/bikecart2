import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true
    }
)
export const Address = mongoose.model("Address", addressSchema)