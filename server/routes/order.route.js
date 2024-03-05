import express from "express";
import {placeorder}  from "../controllers/order.controller.js";

const router = express.Router();

router.route("/placeorder").post(placeorder)

export default router