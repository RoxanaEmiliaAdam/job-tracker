"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { addJob, AddJob } from "./AddJobService";

export default function AddJobForm() {
  const [formData, setFormData] = useState<AddJob>({
    title: "",
    company: "",
    location: "",
    status: "",
  });
  const [succesMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: addJob,
    onSuccess: () => {
      setFormData({
        title: "",
        company: "",
        location: "",
        status: "",
      });
      setSuccessMessage("✅ Job added successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-xl p-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-6 text-center text-blue-900">
            Add a New Job
          </h2>

          {succesMessage && (
            <div className="mb-4 text-green-600 text-sm font medium text-center">
              {succesMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="placeholder:text-neutral-500 placeholder:italic"
            />
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              className="placeholder:text-neutral-500 placeholder:italic"
            />
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="placeholder:text-neutral-500 placeholder:italic"
            />
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-white ">
                <SelectItem value="pending">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-700 font-bold text-white"
            >
              Add Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
