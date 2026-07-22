import express from "express";

import {
  getDashboardStats,
  addProduct,
  getAdminProducts,
  updateProduct,
  deleteProduct
} from "../controllers/adminController.js";


import {
  protect,
  admin
} from "../middleware/authMiddleware.js";


const router = express.Router();



router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);



router.get(
  "/products",
  protect,
  admin,
  getAdminProducts
);



router.post(
  "/products",
  protect,
  admin,
  addProduct
);



router.put(
  "/products/:id",
  protect,
  admin,
  updateProduct
);



router.delete(
  "/products/:id",
  protect,
  admin,
  deleteProduct
);



export default router;