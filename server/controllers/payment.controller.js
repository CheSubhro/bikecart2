import {Payment} from "../models/payment.model.js";

export const processPayment = async(req,res) =>{

    try {
        const { cardnumber, expirydate, cvv } = req.body;

        const paymentData = new Payment({
            cardnumber, expirydate, cvv
        });
    
        // Save the Payment data
        const saveData = await paymentData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Payment created successfully',
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


