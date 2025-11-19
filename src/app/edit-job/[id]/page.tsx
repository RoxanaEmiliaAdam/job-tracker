"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchJobById, updateJob } from "./EditJobService";
import JobForm, { JobFormValues } from "@/app/app_components/job-form/JobForm";

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;

  const queryClient = useQueryClient();

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
      //router.push("/my-list"); // redirect to job list
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
        }}
        onSubmit={(values) => mutation.mutate(values)}
        submitLabel="Update Job"
        isSubmitting={mutation.isPending}
        timeline={job.timeline}
      />
    </div>
  );
}
