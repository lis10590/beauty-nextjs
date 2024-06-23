import { Schema, model, models } from "mongoose";

const userCustomerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
});

const UserCustomer =
  models.UserCustomer || model("UserCustomer", userCustomerSchema);

export default UserCustomer;
