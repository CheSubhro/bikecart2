import express from "express";
import {create,getAll,getOne,update,deleteproduct,getProductsByCategory }  
from "../controllers/product.controller.js";
import upload from '../multerConfig.js'

const router = express.Router();

router.route("/create").post(upload.single('image'), create);
router.route("/getall").get(getAll)
router.route("/getone/:id").get(getOne)
router.route("/update/:id").put(upload.single('image'),update)
router.route("/delete/:id").delete(deleteproduct)
router.route("/product/:categoryId").get(getProductsByCategory)

export default router