const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    totalOrder: {
      type: Number,
      required: true,
    },
    statusOrder: {
      type: String,
      enum: ["Đang xác nhận", "Đã xác nhận", "Đang giao hàng", "Đã giao hàng"],
      required: true,
    },
    payments: {
      type: String,
      emum: ["Ship COD", "Bank card"],
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
