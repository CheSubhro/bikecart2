import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true
    }
)
export const About = mongoose.model("About", aboutSchema)