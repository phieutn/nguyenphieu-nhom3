import express from "express";
import ProductModel from "../models/product.model.js";

const inventoryRouter = express.Router();

inventoryRouter.get("/all-products", async (req, res) => {
    try {
      const data = req.query;
      const lowQuantity = Number(data.lowQuantity);
  
      let query = {}; 
  
      if (lowQuantity && lowQuantity <= 100) {
        query = { instock: { $lte: lowQuantity } }; // Điều kiện lọc (Nhỏ hơn hoặc bằng params)
      }
  
      const products = await ProductModel.find(query);
  
      res.status(200).json({
        data: products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });

export default inventoryRouter;
