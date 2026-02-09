import { AddJob } from "@/app/add-job/AddJobService";

export function getNextInterviews(jobs: AddJob[]) {
  const now = new Date().getTime();

  return jobs.filter((job) => {
    if (!job.interviewDate) return false;
    const interviewTime = new Date(job.interviewDate).getTime();
    const diffHours = (interviewTime - now) / (1000 * 60 * 60);
    return diffHours > 0 && diffHours <= 48;
  });
}
