import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
    collaborators: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    title: {
      type: String,
      required: [true, "please provide title"],
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "please provide category"],
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    language: {
      type: String,
    },
    cover: {
      type: Object,
    },
    chapters: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    forks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Fork",
      },
    ],
    forkHistory: {
      type: Array,
    },

    progress: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Progress",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    votesCount: {
      type: Object,
      default: { upvotes: 0, downvotes: 0 },
    },
    views: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
    chapterCount: {
      type: Object,
      default: { published: 0, draft: 0 },
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 10;
}

StorySchema.pre("find", function () {
  // Only add the visibility check if it's not specifically excluded
  if (!this.getOptions().excludeVisibilityCheck) {
    this.where({ visibility: "published" });
  }
});

StorySchema.pre("findById", function () {
  // Only add the visibility check if it's not specifically excluded
  if (!this.getOptions().excludeVisibilityCheck) {
    this.where({ visibility: "published" });
  }
});

StorySchema.pre("findOne", function () {
  // Only add the visibility check if it's not specifically excluded
  if (!this.getOptions().excludeVisibilityCheck) {
    this.where({ visibility: "published" });
  }
});

export default mongoose.model("Story", StorySchema);
