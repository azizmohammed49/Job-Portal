import { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    salaryRange: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// You can add indexes for better search performance
jobSchema.index({
  title: "text",
  company: "text",
  location: "text",
  description: "text",
});

export const JobModel = model("jobs", jobSchema);
