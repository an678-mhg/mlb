const express = require("express");
const mongosee = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// Routes
const usersRoute = require("../routes/UsersRoute");
const uploadRoute = require("../routes/UploadRoute");
const adminRoute = require("../routes/AdminRoute");
const productRoute = require("../routes/ProductRoute");
const orderRoute = require("../routes/OrderRoute");
const reviewRoute = require("../routes/ReviewRoute");

const app = express();

app.use(express.static("public"));

const url = `mongodb+srv://${process.env.ROOT}:${process.env.PASS}@shop-app.tamej.mongodb.net/shop-app?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    await mongosee.connect(url);
    console.log("connectDB success !");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};
connectDB();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/api/auth", usersRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/admin", adminRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
