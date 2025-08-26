import axios from "axios";
import { AddJob } from "../add-job/AddJobService";

export async function fetchJobs() {
  const response = await axios.get<AddJob[]>("/api/jobs");
  return response.data;
}

export async function deleteJob(id: string) {
  try {
    const res = await axios.delete(`/api/jobs/${id}`);
    return res.data;
  } catch (error) {
    throw Error("Failed to delete job");
  }
}
