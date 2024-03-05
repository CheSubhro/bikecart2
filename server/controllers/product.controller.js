import {Product} from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import upload from '../multerConfig.js'
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';


export const create = async(req,res) =>{

    try {
        const { name, slug, description, price, salesprice,
                quantity, metakeyword, metadescription,shippingcharge,
                taxes,featured,stock,status,categoryId } = req.body;

        // Check if the provided categoryId corresponds to a valid Category
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found',
            });
        }        

        const productData = new Product({
                name, slug, description, price, salesprice,
                quantity, metakeyword, metadescription,shippingcharge,
                taxes,featured,stock,status,categoryId
        });
    

        // Check if there is a file in the request
        if (req.file) {
            // Assign the file path or URL to the 'img' field
            productData.image = path.basename(req.file.path); // Adjust this based on your server configuration
          }
        // Save the Category data
        const saveData = await productData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            data: saveData,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message,
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const productData = await Product.find();

        if (!productData || productData.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No Product Page Data Found',
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Product Page data retrieved successfully',
            data: productData,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export const getOne = async(req,res) =>{
    try {
        const id = req.params.id;
        const productPageExist = await Product.findById(id);
    
        if (!productPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Product Page Not Found',
            });
        }
    
        return res.status(200).json({
            status: 'success',
            message: 'Product Page retrieved successfully',
            data: productPageExist,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

export const update = async (req, res) => {
    try {
        const productId = req.params.id;
        const {
            name,
            slug,
            description,
            price,
            salesprice,
            quantity,
            metakeyword,
            metadescription,
            shippingcharge,
            taxes,
            featured,
            stock,
            status,
            categoryId
        } = req.body;

        // Check if the provided categoryId corresponds to a valid Category
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({
                status: 'error',
                message: 'Category not found',
            });
        }

        // Check if the provided productId corresponds to a valid Product
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found',
            });
        }

        // If there's a new image file, delete the old image file
        if (req.file) {
            const oldImagePath = productExists.image;
            if (oldImagePath) {
                // Construct the full path to the old image file
                const fullOldImagePath = path.join('uploads', oldImagePath);

                // Delete the old image file
                await fs.unlink(fullOldImagePath);
            }

            // Assign the file path or URL to the 'image' field
            productExists.image = path.basename(req.file.path);
        }

        // Update the Product data
        const updatedData = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                slug,
                description,
                price,
                salesprice,
                quantity,
                metakeyword,
                metadescription,
                shippingcharge,
                taxes,
                featured,
                stock,
                status,
                categoryId,
            },
            { new: true } // To return the updated document
        );

        res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            data: updatedData,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message,
        });
    }
};


export const deleteproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productPageExist = await Product.findById(id);

        if (!productPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Product Page Not Found',
            });
        }

        // Delete the associated image file
        const imagePath = productPageExist.image;
        if (imagePath) {
            // Construct the full path to the image file
            const fullImagePath = path.join('uploads', imagePath);

            // Delete the image file
            await fs.unlink(fullImagePath);
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            status: 'success',
            message: 'Product Page Deleted Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export const getProductsByCategory = async(req,res) =>{
    const { categoryId } = req.params;
    console.log(categoryId)

    try {
        const products = await Product.find({ categoryId });
    
        res.status(200).json({
          status: 'success',
          message: 'Products fetched successfully',
          products,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
}

