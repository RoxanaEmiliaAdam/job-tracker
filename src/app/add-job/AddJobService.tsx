import axios from "axios";

export interface AddJob {
  _id?: string;
  title: string;
  company: string;
  location: string;
  status: string;
}

export const addJob = (newJob: AddJob) => {
  return axios.post("api/jobs", newJob);
};
