import axios from "axios";
import { AddJob } from "../add-job/AddJobService";
import { FetchJobsParams } from "@/lib/types/fetchJobs";

export async function fetchJobs(
  params: FetchJobsParams = {}
): Promise<AddJob[]> {
  const response = await axios.get("/api/jobs", { params });
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
