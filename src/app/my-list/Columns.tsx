"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AddJob } from "../add-job/AddJobService";
import JobActions from "./JobActions";
import { TableHeader } from "./TableHeader";

export const columns: ColumnDef<AddJob>[] = [
  {
    accessorKey: "title",
    header: () => <TableHeader>Job Title</TableHeader>,
  },
  {
    accessorKey: "company",
    header: () => <TableHeader>Company</TableHeader>,
  },
  {
    accessorKey: "location",
    header: () => <TableHeader>Location</TableHeader>,
  },
  {
    accessorKey: "status",
    header: () => <TableHeader>Status</TableHeader>,
  },
  {
    id: "actions",
    header: () => <TableHeader>Actions</TableHeader>,
    cell: ({ row }) => <JobActions job={row.original} />,
  },
];
