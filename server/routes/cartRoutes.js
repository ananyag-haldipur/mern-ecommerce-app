import express from "express";

import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();


// Get cart
router.get("/", protect, getCart);


// Add product
router.post("/", protect, addToCart);


// Update quantity
router.put("/:productId", protect, updateCartQuantity);


// Remove product
router.delete("/:productId", protect, removeFromCart);


// Clear cart
router.delete("/", protect, clearCart);


export default router;