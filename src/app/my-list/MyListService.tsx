import axios from "axios";
import { AddJob } from "../add-job/AddJobService";

export async function fetchJobs(
  search?: string,
  status?: string,
  sort?: string,
  order?: "asc" | "desc"
): Promise<AddJob[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);

  const response = await axios.get(`/api/jobs?${params.toString()}`);
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
