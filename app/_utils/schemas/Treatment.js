import { Schema, model, models } from "mongoose";

const treatmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  treatmentId: { type: Schema.Types.ObjectId, ref: "Treatment" },
  treatmentDate: { type: Date },
});

const Treatment = models.Treatment || model("Treatment", treatmentSchema);

export default Treatment;
