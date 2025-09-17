import { AddJob } from "@/app/add-job/AddJobService";
import axios from "axios";

// fetch a job by id
export async function fetchJobById(id: string) {
  const res = await axios.get(`/api/jobs/${id}`);
  return res.data;
}

// update a job

export async function updateJob(id: string, jobData: AddJob) {
  const res = await axios.put(`/api/jobs/${id}`, jobData);
  return res.data;
}
