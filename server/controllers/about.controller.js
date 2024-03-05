import {About} from "../models/about.model.js";

export const create = async(req,res) =>{

    try {
        const { title, content } = req.body;

        const aboutData = new About({
            title,
            content
        });
    
        // Save the About data
        const saveData = await aboutData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'About created successfully',
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
        const aboutData = await About.find();

        if (!aboutData || aboutData.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No About Page Data Found',
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'About Page data retrieved successfully',
            data: aboutData,
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
        const aboutPageExist = await About.findById(id);
    
        if (!aboutPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'About Page Not Found',
            });
        }
    
        return res.status(200).json({
            status: 'success',
            message: 'About Page retrieved successfully',
            data: aboutPageExist,
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
        const aboutPageExist = await About.findById(id);
    
        if (!aboutPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'About Page Not Found',
            });
        }
    
        // Create a new About Page instance with updated fields
        const updatedAboutData = {
            title: req.body.title || cmsPageExist.title,
            content: req.body.content || cmsPageExist.content,
        };
    
        // Update the About Page data
        const updatedData = await About.findByIdAndUpdate(id, updatedAboutData, { new: true });
    
        return res.status(200).json({
            status: 'success',
            message: 'About Page updated successfully',
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

