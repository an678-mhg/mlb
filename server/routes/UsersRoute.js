const express = require("express");
const {
  loginUsers,
  registerUsers,
  getUserInfo,
  editUser,
} = require("../controllers/UsersControllers");
const checkLogin = require("../middlewares/checkLogin");

const route = express.Router();

// POST
// /api/auth/login
route.post("/login", loginUsers);

// POST
// /api/auth/register
route.post("/register", registerUsers);

// GET
// /api/auth
route.get("/", checkLogin, getUserInfo);

route.put("/", checkLogin, editUser);

module.exports = route;
