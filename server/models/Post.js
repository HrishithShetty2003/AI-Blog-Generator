import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topic: String,
  title: String,
  content: String
}, { timestamps: true });

export default mongoose.model("Post", postSchema);