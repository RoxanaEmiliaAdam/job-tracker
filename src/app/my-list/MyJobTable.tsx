"use client";

import { useQuery } from "@tanstack/react-query";
import { AddJob } from "../add-job/AddJobService";
import { fetchJobs } from "./MyListService";
import { columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

export default function MyJobTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // state debouncedSearch used => the query runs only 3 sec after this state is updated
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const {
    data: jobs = [],
    isLoading,
    error,
  } = useQuery<AddJob[]>({
    queryKey: ["jobs", debouncedSearch, statusFilter, sortField, sortOrder],
    queryFn: () =>
      fetchJobs(debouncedSearch, statusFilter, sortField, sortOrder),
  });

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;

  return (
    <div>
      {/* search & filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
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
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="company">Company</option>
          <option value="status">Status</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-2 py-1"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      {/* table */}
      <DataTable columns={columns} data={jobs} />
    </div>
  );
}
