import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        reviewrating: {
            type: String,
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },

    },
    {
        timestamps: true
    }
)
export const Review = mongoose.model("Review", reviewSchema)