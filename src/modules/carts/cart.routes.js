import express from "express";
import {
  addToCart,
  updateCartItem,
  deleteCartItem,
  getCart
} from "./cart.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.use(auth);

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:id", updateCartItem);
router.delete("/items/:id", deleteCartItem);

export default router;
