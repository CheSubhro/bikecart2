import express from "express";
import {saveaddress}  from "../controllers/address.controller.js";

const router = express.Router();

router.route("/saveaddress").post(saveaddress)

export default router