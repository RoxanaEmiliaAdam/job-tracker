import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
  {
    title: String,
    company: String,
    status: String,
    location: String,
    link: String,
    timeline: [
      {
        stage: String,
        date: String,
      },
    ],
    notes: { type: String, default: "" },
    reminder: {
      interviewDate: { type: String, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
