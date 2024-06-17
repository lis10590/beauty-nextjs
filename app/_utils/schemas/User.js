import { Schema, model, models } from "mongoose";
import connectDB from "../db";

const userSchema = new Schema({
  firstName: { type: String, maxlength: 20 },
  lastName: { type: String, maxlength: 20 },
  password: { type: String },
  email: { type: String },
});

async function getUserModel() {
  await connectDB();
  return models.User || model("User", userSchema);
}

export default getUserModel;
