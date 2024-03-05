import {Address} from "../models/address.model.js";

export const saveaddress = async(req,res) =>{

    try {
        const { fullName, addressLine1, addressLine2, city, state, zipCode } = req.body;

        const addressData = new Address({
            fullName, 
            addressLine1, 
            addressLine2, 
            city,
            state, 
            zipCode
        });
    
        // Save the Address data
        const saveData = await addressData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Address created successfully',
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


