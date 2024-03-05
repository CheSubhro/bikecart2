import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String, 
            required: true,
        },
        salesprice: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        metakeyword: {
            type: String,
            required: true,
        },
        metadescription: {
            type: String,
            required: true,
        },
        shippingcharge: {
            type: Number,
            required: true,
        },
        taxes: {
            type: Number,
            required: true,
        },
        featured: {
            type: Boolean,
            required: true,
        },
        stock: {
            type: Boolean,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model("Product", productSchema);
