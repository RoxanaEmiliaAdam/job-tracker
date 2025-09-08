"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { addJob } from "./AddJobService";
import JobForm from "../app_components/job-form/JobForm";

export default function AddJobForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: addJob,
    onSuccess: () => {
      setSuccessMessage("✅ Job added successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  return (
    <JobForm
      onSubmit={(values) => mutation.mutate(values)}
      submitLabel={mutation.isPending ? "Saving..." : "Add Job"}
      successMessage={successMessage}
    />
  );
}
