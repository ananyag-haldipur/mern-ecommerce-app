import express from "express";

import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";


const router = express.Router();


// User
router.post("/", protect, placeOrder);

router.get("/myorders", protect, getMyOrders);


// Admin
router.get("/all", protect, admin, getAllOrders);

router.put("/:id/status", protect, admin, updateOrderStatus);


export default router;