import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        cardnumber: {
            type: String,
            required: true,
        },
        expirydate: {
            type: String,
            required: true,
        },
        cvv: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)
export const Payment = mongoose.model("Payment", paymentSchema)