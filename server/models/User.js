import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String, required: true },
});

const User = new mongoose.model("User", userSchema);
export default User;
