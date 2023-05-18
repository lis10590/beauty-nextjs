import { Schema, model, models } from "mongoose";

const ClientSchema = new Schema({
  fullName: { type: String },
  phoneNumber: { type: String },
  treatmentHistory: [{ treatmentName: { type: String }, date: { type: Date } }],

  productsPurchased: [
    {
      productName: { type: String },
      date: { type: Date },
      _id: false,
    },
  ],
});

const Client = models.Client || model("Client", ClientSchema);

export default Client;
