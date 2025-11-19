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
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
