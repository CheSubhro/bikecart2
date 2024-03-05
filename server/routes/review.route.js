import express from "express";
import {create,getAll,getOne}  from "../controllers/review.controller.js";

const router = express.Router();

router.route("/create").post(create);
router.route("/getall").get(getAll)
router.route("/getone/:id").get(getOne)

export default router