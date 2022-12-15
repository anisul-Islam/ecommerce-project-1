import { Router } from "express";
import formidable from "express-formidable";
import {
  getAllOrders,
  getAllOrdersForAdmin,
  updateOrderStatus,
} from "../controllers/order.js";

import { isAdmin, requireSignin } from "../middlewares/auth.js";

const orderRoutes = Router();

orderRoutes.get("/orders", requireSignin, getAllOrders);
orderRoutes.get("/all-orders", requireSignin, isAdmin, getAllOrdersForAdmin);
orderRoutes.put("/order-status/:id", requireSignin, isAdmin, updateOrderStatus);

export default orderRoutes;
