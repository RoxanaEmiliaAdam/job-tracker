import { AddJob } from "@/app/add-job/AddJobService";
import axios from "axios";

// fetch a job by id
export async function fetchJobById(id: string) {
  const res = await axios.get(`/api/jobs/${id}`);
  return res.data;
}

// update a job

export async function updateJob(id: string, jobData: Partial<AddJob>) {
  const res = await axios.put(`/api/jobs/${id}`, jobData);
  return res.data;
}

// save reminder
export async function saveInterviewReminder(
  jobId: string,
  data: { interviewDate: string }
) {
  const res = await axios.put(`/api/jobs/${jobId}/reminder`, data);
  return res.data;
}

// remove reminder
export async function removeInterviewReminder(jobId: string) {
  try {
    const res = await axios.delete(`/api/jobs/${jobId}/reminder`);
    return res.data;
  } catch {
    throw Error("Failed to delete job");
  }
}
