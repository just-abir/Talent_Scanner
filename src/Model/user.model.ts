import mongoose, { Schema } from "mongoose";

interface UserInformation {
  userName: string;
  email: string;
  password: string;
  profileImage?: string | null;
  role: "user" | "admin";
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date | null;
}

const userSchema = new Schema<UserInformation>(
  {
    userName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model<UserInformation>("User", userSchema);

export default userModel;
