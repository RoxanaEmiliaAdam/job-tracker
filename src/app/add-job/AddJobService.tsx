import axios from "axios";

export interface newJob {
  _id?: string;
  title: string;
  company: string;
  location: string;
  status: string;
}

export const addJob = (newJob: newJob) => {
  return axios.post("api/jobs", newJob);
};
