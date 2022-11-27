const express = require("express");
const route = express.Router();
const checkAdmin = require("../middlewares/checkAdmin");
const checkLogin = require("../middlewares/checkLogin");
const {
  getAllOrder,
  createOrder,
  getMyOrder,
  getOrderbyId,
  deleteOrder,
  editOderbyId,
} = require("../controllers/OrderController");

// GET
// /api/order
// Lấy toàn bộ đơn hàng
// Private Admin Role
route.get("/", checkAdmin, getAllOrder);

// POST
// /api/order
// Tạo mới đơn hàng
// Private token user
route.post("/", checkLogin, createOrder);

// GET
// /api/order
// Đơn hàng của tôi
// Private token user
route.get("/my-order", checkLogin, getMyOrder);

// DELETE
// /api/order/:id
// Xóa đơn hàng
// Private Admin Role
route.delete("/:id", checkAdmin, deleteOrder);

// GET
// api/order/:id
// lấy về chi tiết đơn hàng
// Private token user
route.get("/:id", checkLogin, getOrderbyId);

route.put("/", checkAdmin, editOderbyId);

module.exports = route;
