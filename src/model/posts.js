import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    likes: {
      type: "number",
      default: 0,
    },
    dislikes: {
      type: "number",
      default: 0,
    },
    share: {
      type: "number",
      default: 0,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  },
  { timestamps: true }
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
