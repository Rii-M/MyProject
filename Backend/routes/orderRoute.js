import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyEsewaPayment } from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/verify-esewa", verifyEsewaPayment);

export default orderRouter;
