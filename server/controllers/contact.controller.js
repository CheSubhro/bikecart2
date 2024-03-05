import {Contact} from "../models/contact.model.js";

export const create = async(req,res) =>{

    try {
        const { name, email, subject, message, status } = req.body;

        const contactData = new Contact({
            name, email, subject, message, status
        });
    
        // Save the Category data
        const saveData = await contactData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Contact created successfully',
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
        const contactData = await Contact.find();

        if (!contactData || contactData.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No Contact Page Data Found',
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Contact Page data retrieved successfully',
            data: contactData,
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
        const contactPageExist = await Contact.findById(id);
    
        if (!contactPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact Page Not Found',
            });
        }
    
        return res.status(200).json({
            status: 'success',
            message: 'Contact Page retrieved successfully',
            data: contactPageExist,
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
        const contactPageExist = await Contact.findById(id);
    
        if (!contactPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact Page Not Found',
            });
        }
    
        // Create a new Contact Page instance with updated fields
        const updatedContactData = {
            name: req.body.name || contactPageExist.name,
            email: req.body.email || contactPageExist.email,
            subject: req.body.subject || contactPageExist.subject,
            message: req.body.message || contactPageExist.message,
            status: req.body.status || contactPageExist.status,
        };
    
        // Update the Contact Page data
        const updatedData = await Contact.findByIdAndUpdate(id, updatedContactData, { new: true });
    
        return res.status(200).json({
            status: 'success',
            message: 'Contact Page updated successfully',
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

export const deletecontact = async(req,res) =>{
    try {
        const id = req.params.id;
        const contactPageExist = await Contact.findById(id);
    
        if (!contactPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact Page Not Found',
            });
        }
    
        await Contact.findByIdAndDelete(id);
    
        return res.status(200).json({
            status: 'success',
            message: 'Contact Page Deleted Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

