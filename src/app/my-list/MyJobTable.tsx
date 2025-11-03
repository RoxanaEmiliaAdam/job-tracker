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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { selectItemClasses } from "@/lib/styles/styles";

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

  // Debounced search to reduce API calls - refetch after user types a search term
  const [debouncedSearch] = useDebounceValue(filters.search, 300);

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSizeDesktop = 5;
  const pageSizeMobile = 4;

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (["all", "none"].includes(value)) params.delete(key);
    else params.set(key, value);

    router.replace(`?${params.toString()}`);
    setPage(1); // reset to first page on filter change
  };

  // Determine pageSize based on window width
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const pageSize = isMobile ? pageSizeMobile : pageSizeDesktop;

  // Fetch jobs from server
  const { data, isLoading, error } = useQuery<
    { items: AddJob[]; totalCount: number }, // TData
    Error, // TError
    { items: AddJob[]; totalCount: number } // TQueryFnData
  >({
    queryKey: [
      "jobs",
      debouncedSearch,
      filters.status,
      filters.sortBy,
      filters.sortOrder,
      page,
      pageSize,
    ],
    queryFn: () =>
      fetchJobs({
        search: debouncedSearch,
        status: filters.status,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        page,
        pageSize,
      }),
  });

  const jobs = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-4 p-2 rounded-md bg-gray-50">
        <Input
          placeholder="Search jobs..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="flex-grow min-w-[150px] max-w-full h-[3flex-grow min-w-[100px] max-w-full h-[38px] border rounded-md px-2 py-1 bg-white hover:bg-blue-50 focus:bg-blue-100 transition8px] "
        />
        <Select
          value={filters.status || "all"}
          onValueChange={(value) => updateFilter("status", value)}
        >
          <SelectTrigger className="h-[38px] min-w-[90px] max-w-[120px] border rounded-md px-2 py-1 bg-white hover:bg-blue-50 focus:bg-blue-100 transition flex-shrink-0">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md rounded-md">
            <SelectItem value="all">All Status</SelectItem>

            <SelectItem className={selectItemClasses} value="Interview">
              Interview
            </SelectItem>
            <SelectItem className={selectItemClasses} value="Offer">
              Offer
            </SelectItem>
            <SelectItem className={selectItemClasses} value="Rejected">
              Rejected
            </SelectItem>
            <SelectItem className={selectItemClasses} value="Applied">
              Applied
            </SelectItem>
          </SelectContent>
        </Select>

        {/* SortBy Select */}
        <Select
          value={filters.sortBy || ""}
          onValueChange={(val) => updateFilter("sortBy", val)}
        >
          <SelectTrigger className="h-[38px] min-w-[90px] max-w-[120px] border rounded-md px-2 py-1 bg-white hover:bg-blue-50 focus:bg-blue-100 transition flex-shrink-0">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md rounded-md">
            <SelectItem value="none" className={selectItemClasses}>
              Sort By
            </SelectItem>
            <SelectItem value="title" className={selectItemClasses}>
              Title
            </SelectItem>
            <SelectItem value="company" className={selectItemClasses}>
              Company
            </SelectItem>
            <SelectItem value="status" className={selectItemClasses}>
              Status
            </SelectItem>
          </SelectContent>
        </Select>

        {/* SortOrder Select */}
        <Select
          value={filters.sortOrder || "asc"}
          onValueChange={(val) =>
            updateFilter("sortOrder", val as "asc" | "desc")
          }
        >
          <SelectTrigger className="h-[38px] min-w-[80px] max-w-[100px] border rounded-md px-2 py-1 bg-white hover:bg-blue-50 focus:bg-blue-100 transition flex-shrink-0">
            <SelectValue placeholder="Asc/Desc" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md rounded-md">
            <SelectItem value="asc" className={selectItemClasses}>
              Asc
            </SelectItem>
            <SelectItem value="desc" className={selectItemClasses}>
              Desc
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        {isFiltered && (
          <Button
            onClick={() => router.replace("?")}
            className="h-[38px] min-w-[70px] max-w-[100px] border rounded-md px-2 py-1 hover:bg-blue-100 flex-shrink-0"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Render based on screen size */}
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto space-y-4">
        <DataTable columns={columns} data={jobs} />
        {totalPages > 1 && (
          <PaginationControls
            pageIndex={page - 1}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p + 1)}
          />
        )}
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-2">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg p-3 shadow-sm bg-blue-50 hover:bg-blue-100 transition flex flex-col gap-1"
          >
            <div className="font-semibold text-lg">{job.title}</div>
            <div className="text-sm text-gray-600">Company: {job.company}</div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Status: {job.status}</span>
              <span>{job.location}</span>
              <JobActions job={job} />
            </div>
          </div>
        ))}
        {totalPages > 1 && (
          <PaginationControls
            pageIndex={page - 1}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p + 1)}
          />
        )}
      </div>
    </div>
  );
}
