import { Schema, model, models } from "mongoose";

const treatmentHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  treatmentName: { type: String },
  price: { type: Number },
});

const TreatmentHistory =
  models.TreatmentHistory || model("TreatmentHistory", treatmentHistorySchema);

export default TreatmentHistory;
