import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  creatorId: String,
  tags: [String],
  links: [String],
  fileLink: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
