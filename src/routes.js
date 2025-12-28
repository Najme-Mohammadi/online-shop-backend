import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/cart", cartRoutes);

export default router;

// import express from "express";
// const router = express.Router();

// const authRoutes = require('./modules/auth/auth.routes');
// router.use('/auth', authRoutes);
// // console.log(typeof authRoutes);

// const productRoutes = require('./modules/product/product.routes');
// router.use('/product', productRoutes);

// const categoryRoutes = require('./modules/category/category.routes');
// router.use('/product', categoryRoutes);

// const cartRoutes = require('./modules/cart/cart.routes');
// router.use('/cart', cartRoutes);

// export default router;