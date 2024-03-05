import express from "express";
import {processPayment}  from "../controllers/payment.controller.js";

const router = express.Router();

router.route("/processpayment").post(processPayment)

export default router