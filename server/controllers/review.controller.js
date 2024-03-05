import {Review} from "../models/review.model.js";

export const create = async(req,res) =>{

    try {
        const { comment, reviewrating,productId } = req.body;

        const reviewData = new Review({
            comment,
            reviewrating,
            productId
        });
    
        const saveData = await reviewData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'Review created successfully',
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

export const getAll = async(req,res) =>{
    try {
        const reviewData = await Review.find();

        if (!reviewData || reviewData.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No Review Page Data Found',
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Review Page data retrieved successfully',
            data: reviewData,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;
        // Assuming 'productId' is a field in your reviews table
        const reviewPageExist = await Review.find({ productId });

        if (!reviewPageExist) {
            return res.status(404).json({
                status: 'error',
                message: 'Review Page Not Found',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Review Page retrieved successfully',
            data: reviewPageExist,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};



