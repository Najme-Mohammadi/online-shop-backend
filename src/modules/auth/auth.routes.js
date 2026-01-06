import express from "express";
import authcontroller from "./auth.controller.js";

const router = express.Router();

router.post("/register", authcontroller.register);
router.post("/login", authcontroller.login);

export default router;
// console.log('register:', typeof authcontroller.register);
// console.log('login:', typeof authcontroller.login);