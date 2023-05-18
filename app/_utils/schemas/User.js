import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, maxlength: 20 },
  lastName: { type: String, maxlength: 20 },
  password: { type: String },
  email: { type: String },
});

const User = models.User || model("User", userSchema);

export default User;
