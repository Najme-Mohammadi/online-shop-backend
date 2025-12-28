import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import cartRoutes from "./modules/carts/cart.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/cart", cartRoutes);

export default router;

