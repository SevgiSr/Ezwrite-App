import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide username"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 3,
      select: false,
    },
    profilePicture: {
      type: Object,
    },
    stories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Story",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    profileName: {
      type: String,
      default: "user",
    },
    pronouns: {
      type: String,
    },
    about: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    privateConvs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "PrivateConv",
      },
    ],
    notifications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Notification",
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  /*   console.log(this);
  {
       name: 'sevgi3',
       password: '123',
       _id: new ObjectId("63c04f92628685f9db2e5cbc"),
       __v: 0
} */
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
