import express from "express";
import { register, login } from "./auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
// console.log('register:', typeof authController.register);
// console.log('login:', typeof authController.login);