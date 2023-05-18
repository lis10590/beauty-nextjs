import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  start: { type: Date },
  end: { type: Date },
  title: { type: String },
  clientName: { type: String },
  phoneNumber: { type: String },
});

const Event = models.Event || model("Event", eventSchema);

export default Event;
