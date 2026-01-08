"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  fetchJobById,
  removeInterviewReminder,
  saveInterviewReminder,
  updateJob,
} from "./EditJobService";
import JobForm, { JobFormValues } from "@/app/app_components/job-form/JobForm";
import { useState } from "react";

export default function EditJobPage() {
  const params = useParams();
  const jobId = params?.id as string;

  const queryClient = useQueryClient();

  const [successMessage, setSuccessMessage] = useState("");

  // Fetch the existing job

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJobById(jobId),
    enabled: !!jobId,
  });

  // mutation for update
  const mutation = useMutation({
    mutationFn: (updatedJob: JobFormValues) => updateJob(jobId, updatedJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });

      setSuccessMessage("Job updated successfully!");

      setTimeout(() => setSuccessMessage(""), 2000);
    },
  });

  // mutation for save reminder
  const saveReminderMutation = useMutation({
    mutationFn: (data: { interviewDate: string }) => {
      return saveInterviewReminder(jobId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
    },

    onError: (err) => {
      console.error("❌ ERROR saving reminder:", err);
    },
  });

  // mutation for delete reminder
  const removeReminderMutation = useMutation({
    mutationFn: () => removeInterviewReminder(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
    },
  });

  if (isLoading || !job) return <p>Loading job data...</p>;

  return (
    <div>
      <JobForm
        initialValues={{
          title: job.title,
          company: job.company,
          location: job.location,
          status: job.status,
          notes: job.notes,
        }}
        onSubmit={(values) => mutation.mutate(values)}
        submitLabel="Update Job"
        isSubmitting={mutation.isPending}
        timeline={job.timeline}
        reminder={job.reminder}
        successMessage={successMessage}
        onSaveReminder={(data) => saveReminderMutation.mutate(data)}
        onRemoveReminder={() => removeReminderMutation.mutate()}
      />
    </div>
  );
}
