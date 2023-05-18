import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  productName: { type: String },
  manufacturer: { type: String },
  productType: { type: String },
  productGroup: { type: String },
  price: { type: Number },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
