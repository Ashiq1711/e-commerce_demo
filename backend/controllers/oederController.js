// placing order uding cod payment

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const {userId,items,amount,address}=req.body

    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "Order Placed",
      paymentMethord: "COD",
      payment: false,
      date: Date.now(),
   
    }

    const newOrder = new orderModel(orderData);

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
};
// placing order uding SSLEcommerce payment

const placeOrderSSLEcommerce = async (req, res) => {};
// All Order data for admin pannel

const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// user Order data for admin Frpntend

const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders =await orderModel.find({ userId });
    res.json({ success: true, orders });
    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// update order status

const updateStatus = async (req, res) => {
  try {
    const {orderId,status}=req.body
    await orderModel .findByIdAndUpdate(orderId,{status})
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderSSLEcommerce,
  allOrder,
  userOrder,
  updateStatus,
};
