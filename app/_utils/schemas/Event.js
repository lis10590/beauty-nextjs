import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  start: { type: Date },
  end: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  treatmentId: { type: Schema.Types.ObjectId, ref: "Treatment" },
});

const Event = models.Event || model("Event", eventSchema);

export default Event;
