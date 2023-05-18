import { Schema, model, models } from "mongoose";

const treatmentSchema = new Schema({
  treatmentName: { type: String },
  price: { type: Number },
});

const Treatment = models.Treatment || model("Treatment", treatmentSchema);

export default Treatment;
