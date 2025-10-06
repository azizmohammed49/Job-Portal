import mongoose from "mongoose";
import { generateHash } from "../utils/crypt.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYER", "CANDIDATE", "APPLICANT"],
      default: "APPLICANT",
    },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    profilePicture: { type: String },
    resume: { type: String },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

// Hash password before saving

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await generateHash(this.password);
  }
  //   if (this.role) {
  //     this.role = this.role.toUpperCase();
  //   }
  next();
});

export default mongoose.model("users", userSchema);
