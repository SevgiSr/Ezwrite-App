import mongoose from "mongoose";
import User from "./User.js";
import PullRequest from "./PullRequest.js";
import CollabRequest from "./CollabRequest.js";
import CollabNotification from "./CollabNotification.js";

// CHECKED: Gets deleted and pulled from referense correctly
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
    pullRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "PullRequest",
      },
    ],
    collabRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "CollabRequest",
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

StorySchema.pre("remove", async function (next) {
  try {
    // 'this' refers to the Story instance
    const storyId = this._id;

    // Find all PullRequests and CollabRequests also notifications related to them
    const pullRequests = await PullRequest.find({
      _id: { $in: this.pullRequests },
    });

    const ntPull = await CollabNotification.find({
      request: { $in: pullRequests.map((pr) => pr._id) },
    });

    const collabRequests = await CollabRequest.find({ story: storyId });

    // Loop through each CollabRequest to remove it from User's pendingForkRequests
    for (const collabRequest of collabRequests) {
      try {
        await User.updateOne(
          { _id: collabRequest.user },
          { $pull: { pendingForkRequests: collabRequest._id } }
        );
      } catch (err) {
        console.error(
          `Failed to pull CollabRequest with ID ${collabRequest._id} from User's pendingForkRequests:`,
          err
        );
      }
    }

    const ntCollab = await CollabNotification.find({
      request: { $in: collabRequests.map((cr) => cr._id) },
    });

    //pull all notifications from user document
    const allNotifications = [...ntPull, ...ntCollab];
    await User.updateOne(
      { _id: this.author },
      {
        $pull: {
          collabNotifications: { $in: allNotifications.map((nt) => nt._id) },
        },
      }
    );

    //delete all notifications
    await CollabNotification.deleteMany({
      _id: { $in: allNotifications.map((nt) => nt._id) },
    });

    // Delete all PullRequests and CollabRequests
    await PullRequest.deleteMany({ _id: { $in: this.pullRequests } });
    await CollabRequest.deleteMany({ story: storyId });

    // Proceed to actually remove the Story
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default mongoose.model("Story", StorySchema);
