import mongoose from "mongoose";

const ParagraphSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Paragraph", ParagraphSchema);
