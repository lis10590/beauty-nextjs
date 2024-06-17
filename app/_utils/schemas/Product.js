import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  productName: { type: String },
  manufacturer: { type: String },
  productType: { type: String },
  productGroup: { type: String },
  price: { type: Number },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
