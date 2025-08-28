const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

//  Place new order
router.post("/", OrderController.createOrder);

//  Get all orders of a user
router.get("/user/:userId", OrderController.getUserOrders);

//  Get single order by ID
router.get("/:id", OrderController.getOrderById);

//  Update order status
router.put("/:id", OrderController.updateOrderStatus);

//  Delete order
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
