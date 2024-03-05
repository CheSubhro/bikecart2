import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,

        },
        metakeyword: {
            type: String,
            required: true,
        },
        metadescription: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true
    }
)
export const Category = mongoose.model("Category", categorySchema)