const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Description = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    contentHtml: {
      type: String,
    },
    contentMarkdown: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Description", Description);
