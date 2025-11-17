import axios from "axios";
import { AddJob } from "../add-job/AddJobService";
import { FetchJobsParams } from "@/lib/types/fetchJobs";

export async function fetchJobs(
  params: FetchJobsParams & { page?: number; pageSize?: number } = {}
): Promise<{ items: AddJob[]; totalCount: number }> {
  const response = await axios.get("/api/jobs", { params });
  return response.data;
}

export async function fetchJobById(id: string) {
  const res = await fetch(`/api/jobs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch job details");
  return res.json();
}

export async function deleteJob(id: string) {
  try {
    const res = await axios.delete(`/api/jobs/${id}`);
    return res.data;
  } catch (error) {
    throw Error("Failed to delete job");
  }
}
