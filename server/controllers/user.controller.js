import {User} from "../models/user.model.js";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';


export const registerUser = async(req,res) =>{

    try {
        const { phone, email, password } = req.body;

        // Check if password is provided
        if (!password) {
            return res.status(400).json({
            status: 'error',
            message: 'Password is required',
            });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            phone,
            email,
            password: hashedPassword,
        });
    
        // Save the user data
        const saveData = await userData.save();
        
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
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

export const loginUser = async(req,res) =>{
    try {

        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email and password are required',
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }

        // Check if the provided password matches the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }

        // If credentials are valid, generate a token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
              },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message,
        });
    }
}

