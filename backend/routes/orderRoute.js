import express from "express";

import adminauth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import { allOrder, placeOrder, updateStatus, userOrder } from "../controllers/oederController.js";

const orderRouter = express.Router();
// Admin features for orders
orderRouter.post("/list", adminauth, allOrder);
orderRouter.post("/status", adminauth, updateStatus);
// Payment feature for orders
orderRouter.post("/place", authUser, placeOrder);

// user feature for orders
orderRouter.post("/userorders", authUser, userOrder);


export default orderRouter;
