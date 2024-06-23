import { Schema, model, models } from "mongoose";

const userProductSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
});

const UserProduct =
  models.UserProduct || model("UserProduct", userProductSchema);

export default UserProduct;
