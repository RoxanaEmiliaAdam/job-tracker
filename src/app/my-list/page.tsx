"use client";

import { useQuery } from "@tanstack/react-query";
import InterviewBanner from "./interviewReminder/InterviewBanner";
import MyJobTable from "./MyJobTable";
import { fetchJobs } from "./MyListService";
import { getNextInterview } from "./interviewReminder/InterviewReminder";

export default function MyListPage() {
  const { data: jobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => fetchJobs(),
  });

  // Get all jobs with interviews within 48h
  const upcomingInterviews = jobs?.items ? getNextInterview(jobs.items) : [];

  return (
    <main className="p-6">
      {upcomingInterviews.map((job) => (
        <InterviewBanner
          key={job._id}
          jobId={job._id ?? ""}
          title={job.title}
          company={job.company}
          interviewDate={job.reminder?.interviewDate}
        />
      ))}

      <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center mt-6">
        My Job Applications
      </h1>

      <MyJobTable />
    </main>
  );
}
