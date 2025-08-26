"use client";

import { AddJob } from "../add-job/AddJobService";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "./MyListService";
import { ConfirmDialogBox } from "../app_components/ConfirmDialogBox";

export default function JobActions({ job }: { job: AddJob }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  const handleEdit = () => {};

  const handleDelete = () => {
    if (job._id) {
      mutation.mutate(job._id);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="hover:bg-blue-50 border-blue-800"
        onClick={handleEdit}
      >
        Edit
      </Button>
      <ConfirmDialogBox
        title="Delete Job"
        description="Are you sure you want to delete this job? This action cannot be undone."
        confirmLabel={mutation.isPending ? "Deleting..." : "Delete"}
        cancelLabel="Cancel"
        onConfirm={handleDelete}
      >
        <Button
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
          disabled={mutation.isPending}
        >
          Delete
        </Button>
      </ConfirmDialogBox>
    </div>
  );
}
