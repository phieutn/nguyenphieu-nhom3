import express from "express";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";

const orderRouter = express.Router();

orderRouter.post("/buy", async (req, res) => {
  const { item, quantity } = req.body;

  try {
    // Check is product on inventory
    const product = await ProductModel.findOne({ sku: item });
    if (!product) {
      res.status(402).json({
        message: "Product is not available",
      });
    }

    // Check is enought product
    if (quantity > product.instock) {
      res.status(400).json({
        message: "Not enought product in stock",
      });
    }

    // Update Productmodel
    const newInstockProduct = product.instock - quantity;
    await ProductModel.findOneAndUpdate(
      { sku: item },
      { instock: newInstockProduct },
      { new: true }
    );

    // Create new order and response to client
    const newOrder = new OrderModel({
        item: item,
        quantity: quantity,
        description: product.description,
    })
    res.status(200).json({
      message: "Okay",
      data: newOrder,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default orderRouter;
