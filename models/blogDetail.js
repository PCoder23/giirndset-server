import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  BlogData: Object,
  creator: String,
  creatorId: { type: String, required: true },
  description: String,
  fileLink: String,
  tags: [String],
  title: String,
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("blogDetail", blogSchema);
