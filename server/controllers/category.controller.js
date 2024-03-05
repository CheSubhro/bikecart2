import {Category} from "../models/category.model.js";

export const create = async (req, res) => {
    try {
        const { name, slug, metakeyword, metadescription, status } = req.body;

        const categoryData = new Category({
            name,
            slug,
            metakeyword,
            metadescription,
            status,
        });

        // Save the Category data
        const saveData = await categoryData.save();

        res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            data: saveData,
        });
    } catch (error) {
        console.error(error);

        if (req.accepts('json')) {
            // Respond with JSON for API clients
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                error: error.message,
            });
        } else {
            // Respond with HTML for other clients
            res.status(500).send('Internal Server Error');
        }
    }
};


export const getAll = async (req, res) => {
    try {
        const categoryData = await Category.find();

        if (!categoryData || categoryData.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No Category Page Data Found',
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Category Page data retrieved successfully',
            data: categoryData,
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
        const categoryPageExist = await Category.findById(id);
    
        if (!categoryPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Category Page Not Found',
            });
        }
    
        return res.status(200).json({
            status: 'success',
            message: 'Category Page retrieved successfully',
            data: categoryPageExist,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

export const update = async(req,res) =>{
    try {
        const id = req.params.id;
        const categoryPageExist = await Category.findById(id);
    
        if (!categoryPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Category Page Not Found',
            });
        }
    
        // Create a new Category Page instance with updated fields
        const updatedCategoryData = {
            name: req.body.name || categoryPageExist.name,
            slug: req.body.slug || categoryPageExist.slug,
            metakeyword: req.body.metakeyword || categoryPageExist.metakeyword,
            metadescription: req.body.metadescription || categoryPageExist.metadescription,
            status: req.body.status || categoryPageExist.status,
        };
    
        // Update the Category Page data
        const updatedData = await Category.findByIdAndUpdate(id, updatedCategoryData, { new: true });
    
        return res.status(200).json({
            status: 'success',
            message: 'Category Page updated successfully',
            data: updatedData,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

export const deleteabout = async(req,res) =>{
    try {
        const id = req.params.id;
        const aboutPageExist = await About.findById(id);
    
        if (!aboutPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'About Page Not Found',
            });
        }
    
        await About.findByIdAndDelete(id);
    
        return res.status(200).json({
            status: 'success',
            message: 'About Page Deleted Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

