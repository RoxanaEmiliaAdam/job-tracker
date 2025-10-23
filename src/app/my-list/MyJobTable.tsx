"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";
import { useSearchParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { fetchJobs } from "./MyListService";
import { columns } from "./Columns";
import { AddJob } from "../add-job/AddJobService";
import { Button } from "@/components/ui/button";
import JobActions from "./JobActions";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { usePaginatedData } from "../hooks/usePaginationData";
import { useEffect, useState } from "react";

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

  const isFiltered =
    filters.search !== "" ||
    filters.status !== "" ||
    filters.sortBy !== "" ||
    filters.sortOrder !== "asc";

  const [debouncedSearch] = useDebounceValue(filters.search, 300);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`?${params.toString()}`);
  };

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

  const resetDeps = [
    debouncedSearch,
    filters.status,
    filters.sortBy,
    filters.sortOrder,
  ];

  // Detect screen size
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use one pagination hook
  const pageSize = isMobile ? 3 : 5;
  const { paginatedData, pageIndex, setPageIndex, totalPages } =
    usePaginatedData(jobs, pageSize, [...resetDeps, pageSize]);

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4 p-2 rounded-md bg-gray-50 transition">
        <input
          type="text"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="border rounded px-2 py-1 hover:bg-blue-100 focus:bg-white transition flex-1 min-w-[140px]"
        />
        <select
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="border rounded px-2 py-1 hover:bg-blue-100 focus:bg-white transition"
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
          className="border rounded px-2 py-1 hover:bg-blue-100 focus:bg-white transition"
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
          className="border rounded px-2 py-1 hover:bg-blue-100 focus:bg-white transition"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        {isFiltered && (
          <Button
            onClick={() => router.replace("?")}
            className="border rounded px-2 py-1 hover:bg-blue-100"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Render based on screen size */}
      {isMobile ? (
        <div className="space-y-2">
          {paginatedData.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-3 shadow-sm bg-blue-50 hover:bg-blue-100 transition flex flex-col gap-1"
            >
              <div className="font-semibold text-lg">{job.title}</div>
              <div className="text-sm text-gray-600">
                Company: {job.company}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Status: {job.status}</span>
                <span>{job.location}</span>
                <JobActions job={job} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto space-y-2">
          <DataTable columns={columns} data={paginatedData} />
        </div>
      )}

      <div className="p-4 border-t mt-4">
        {totalPages > 1 && (
          <PaginationControls
            pageIndex={pageIndex}
            totalPages={totalPages}
            onPageChange={setPageIndex}
          />
        )}
      </div>
    </div>
  );
}
