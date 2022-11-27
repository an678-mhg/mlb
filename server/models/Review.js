const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    review: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", Review);
