import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String },
});
export default mongoose.model("user", userSchema);
