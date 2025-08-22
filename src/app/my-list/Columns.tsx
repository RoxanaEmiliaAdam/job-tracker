"use client";

import { ColumnDef } from "@tanstack/react-table";
import { newJob } from "../add-job/AddJobService";
import JobActions from "./JobActions";

const headerClass = "font-bold text-gray-800 text-sm uppercase";

export const columns: ColumnDef<newJob>[] = [
  {
    accessorKey: "title",
    header: () => <span className={headerClass}>Job Title</span>,
  },
  {
    accessorKey: "company",
    header: () => <span className={headerClass}>Company</span>,
  },
  {
    accessorKey: "location",
    header: () => <span className={headerClass}>Location</span>,
  },
  {
    accessorKey: "status",
    header: () => <span className={headerClass}>Status</span>,
  },
  {
    id: "actions",
    header: () => <span className={headerClass}>Actions</span>,
    cell: ({ row }) => <JobActions job={row.original} />,
  },
];
