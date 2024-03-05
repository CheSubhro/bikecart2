import {Order} from "../models/order.model.js";

export const placeorder = async(req,res) =>{

    try {
        const { totalPrice, cartItems, userId} = req.body;

        const orderData = new Order({
            totalPrice, cartItems, userId
        });
    
        // Save the Address data
        const saveData = await orderData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Order created successfully',
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


