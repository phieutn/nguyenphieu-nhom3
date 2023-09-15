import express from "express";
import inventoryRouter from "./inventory.router.js";
import authRouter from "./auth.router.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import orderRouter from "./order.router.js";

const router = express.Router();

router.use(authMiddleware);
router.use("/inventory", inventoryRouter);
router.use("/auth", authRouter);
router.use("/order", orderRouter);

export default router;