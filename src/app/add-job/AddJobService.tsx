import axios from "axios";

export interface JobTimelineEntry {
  stage: string;
  date: string;
}

export interface AddJob {
  _id?: string;
  title: string;
  company: string;
  location: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  timeline?: JobTimelineEntry[];
}

// Add New Job
export const addJob = (newJob: Partial<AddJob>) => {
  return axios.post("/api/jobs", newJob);
};
