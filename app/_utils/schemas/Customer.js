import { Schema, model, models } from "mongoose";

const customerSchema = new Schema({
  fullName: { type: String },
  phoneNumber: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
  },
});

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
