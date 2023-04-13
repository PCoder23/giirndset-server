import mongoose from "mongoose";

const userInformationSchema = mongoose.Schema({
  userId: { type: String, required: true },
  imageLink: { type: String, default: null },
  name: { type: String, required: true },
  userName: { type: String, default: "" },
  description: { type: String, default: "" },
  skills: { type: [String], default: [] },
  linkedinLink: { type: String, default: "" },
  githubLink: { type: String, default: "" },
  level: { type: Number, default: 0 },
  followers: { type: [String], default: [] },
  following: { type: [String], default: [] },
  joinedDomains: { type: [String], default: [] },
  createdDomains: { type: [String], default: [] },
  followingProjects: { type: [String], default: [] },
});
export default mongoose.model("userInformation", userInformationSchema);
