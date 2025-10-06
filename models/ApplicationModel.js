import { Schema, model } from "mongoose";

const applicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "jobs", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  resume: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
});

applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });
export const ApplicationModel = model("applications", applicationSchema);
export default ApplicationModel;
