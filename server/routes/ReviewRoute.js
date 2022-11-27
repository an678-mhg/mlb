const express = require("express");
const route = express.Router();
const { getReviews, postReview } = require("../controllers/ReviewController");
const checkLogin = require("../middlewares/checkLogin");

route.get("/:id", getReviews);
route.post("/", checkLogin, postReview);

module.exports = route;
