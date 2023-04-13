import mongoose from "mongoose";

const domainSchema = mongoose.Schema({
  domainName: { type: String, required: true },
  domainCreator: { type: String, required: true },
  members: { type: [String], required: true, default: [] },
  description: { type: String, default: "" },
  logoLink: { type: String },
  moderators: { type: [String], default: [] },
  level: { type: Number, default: 0 },
});
export default mongoose.model("domain", domainSchema);
