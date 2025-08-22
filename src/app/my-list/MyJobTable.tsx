"use client";

import { useQuery } from "@tanstack/react-query";
import { newJob } from "../add-job/AddJobService";
import { fetchJobs } from "./MyListService";
import { columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";

export default function MyJobTable() {
  const {
    data: jobs = [],
    isLoading,
    error,
  } = useQuery<newJob[]>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;

  return <DataTable columns={columns} data={jobs} />;
}
