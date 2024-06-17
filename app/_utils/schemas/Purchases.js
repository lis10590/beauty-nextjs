import { Schema, model, models } from "mongoose";

const purchaseSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  purchseDate: { type: Date },
  quantity: { type: Number },
});

const Purchase = models.Purchase || model("Purchase", purchaseSchema);

export default Purchase;
