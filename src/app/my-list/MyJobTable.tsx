"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";
import { useSearchParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { fetchJobs } from "./MyListService";
import { columns } from "./Columns";
import { AddJob } from "../add-job/AddJobService";

export default function MyJobTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL-driven filters
  const filters = {
    search: searchParams.get("search") ?? "",
    status: searchParams.get("status") ?? "",
    sortBy: searchParams.get("sortBy") ?? "",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") ?? "asc",
  };

  // Debounced search value
  const [debouncedSearch] = useDebounceValue(filters.search, 300);

  // Update URL params
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`?${params.toString()}`);
  };

  // Fetch jobs with React Query
  const {
    data: jobs = [],
    isLoading,
    error,
  } = useQuery<AddJob[]>({
    queryKey: [
      "jobs",
      debouncedSearch,
      filters.status,
      filters.sortBy,
      filters.sortOrder,
    ],
    queryFn: () =>
      fetchJobs({
        search: debouncedSearch,
        status: filters.status,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      }),
  });

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="border rounded px-2 py-1"
        />
        <select
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Applied">Applied</option>
        </select>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter("sortBy", e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="company">Company</option>
          <option value="status">Status</option>
        </select>
        <select
          value={filters.sortOrder}
          onChange={(e) =>
            updateFilter("sortOrder", e.target.value as "asc" | "desc")
          }
          className="border rounded px-2 py-1"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={jobs} />
    </div>
  );
}
