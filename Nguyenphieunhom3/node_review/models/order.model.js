import mongoose from "mongoose";

const Order = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const OrderModel = mongoose.model("orders", Order);

export default OrderModel;