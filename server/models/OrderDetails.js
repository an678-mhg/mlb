const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetails = new Schema(
  {
    oderId: { type: Schema.Types.ObjectId, required: true },
    products: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderDetails", OrderDetails);
