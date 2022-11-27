const express = require("express");
const route = express.Router();
const {
  getAllUsers,
  deleteUsers,
  updateUsers,
  getUser,
} = require("../controllers/AdminController");
const checkAdmin = require("../middlewares/checkAdmin");

// GET
// /api/admin/users
// Get all users
// Private
route.get("/users", checkAdmin, getAllUsers);

// DELETE
// /api/admin/users
// Xóa users
// Private
route.delete("/users", checkAdmin, deleteUsers);

// PUT
// /api/admin/users
// Sửa thông tin users
// Private
route.put("/users", checkAdmin, updateUsers);

// GET
// /api/admin/user
// Lấy users info
// Private
route.get("/user/:id", getUser);
module.exports = route;
