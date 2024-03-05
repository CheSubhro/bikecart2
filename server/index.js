import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("DB Connection successfully");

    app.listen(PORT,()=>{
        console.log(`server is running on port:${PORT}`);
    })

}).catch(error=>console.log(error));

//routes import
import userRouter from './routes/user.route.js'
import aboutRouter from './routes/about.route.js';
import addressRouter from './routes/address.route.js';
import categoryRouter from './routes/category.route.js'
import contactRouter from './routes/contact.route.js'
import paymentRouter from './routes/payment.route.js'
import productRouter from './routes/product.route.js'
import reviewRouter from './routes/review.route.js'
import orderRouter from './routes/order.route.js'


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/about", aboutRouter)
app.use("/api/v1/address", addressRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/contact", contactRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/review", reviewRouter)
app.use("/api/v1/order", orderRouter)


// http://localhost:8000/api/v1/users/register
