import { Schema, model, models } from "mongoose";

const userTreatmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  treatmentId: { type: Schema.Types.ObjectId, ref: "Treatment" },
});

const UserTreatment =
  models.UserTreatment || model("UserTreatment", userTreatmentSchema);

export default UserTreatment;
