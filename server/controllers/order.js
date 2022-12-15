import Order from "../model/order.js";

import { sendEmailWithNodeMailer } from "../helpers/email.js";
import dev from "../config/index.js";
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.json(orders);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    )
      .populate("products", "-photo")
      .populate("buyer", "email name");

    const emailData = {
      email: order.buyer.email,
      subject: "Order status",
      html: `
      <h2> Hello ${order.buyer.name}, Your Order's status is <span style="color: red">  ${order?.status} </span>. </h2>
      <p> <a href="${dev.app.clientURL}" > Visit our website </a> for more details  </p>     
      `, // html body
    };

    sendEmailWithNodeMailer(emailData);

    res.json(order);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
