import express from "express";
import {create,getAll,getOne,update,deletecontact }  from "../controllers/contact.controller.js";

const router = express.Router();

router.route("/create").post(create)
router.route("/getall").get(getAll)
router.route("/getone/:id").get(getOne)
router.route("/update/:id").put(update)
router.route("/delete/:id").delete(deletecontact)

export default router