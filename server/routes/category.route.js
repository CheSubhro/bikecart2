import express from "express";
import {create,getAll,getOne,update,deleteabout }  from "../controllers/category.controller.js";

const router = express.Router();

router.route("/create").post(create)
router.route("/getall").get(getAll)
router.route("/getone/:id").get(getOne)
router.route("/update/:id").put(update)
router.route("/delete/:id").delete(deleteabout)

export default router