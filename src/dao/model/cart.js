import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  }
});

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [cartProductSchema],
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Cart = mongoose.model("Cart", cartSchema);




