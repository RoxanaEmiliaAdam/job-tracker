"use client";

import { useState } from "react";
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

export type JobFormValues = {
  title: string;
  company: string;
  location: string;
  status: string;
};

type JobFormProps = {
  initialValues?: JobFormValues;
  onSubmit: (values: JobFormValues) => void;
  submitLabel?: string;
  successMessage?: string | null;
  isSubmitting?: boolean;
};

const selectOptions = ["Applied", "Interview", "Offer", "Rejected"];

export default function JobForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Job",
  successMessage,
}: JobFormProps) {
  const [formData, setFormData] = useState<JobFormValues>({
    title: initialValues?.title ?? "",
    company: initialValues?.company ?? "",
    location: initialValues?.location ?? "",
    status: initialValues?.status ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.status
    ) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-xl p-6">
        <CardContent>
          <h2 className="text-xl font-semibold mb-6 text-center text-blue-900">
            {submitLabel.includes("Update") ? "Edit Job" : "Add a New Job"}
          </h2>

          {successMessage && (
            <div className="mb-4 text-green-600 text-sm font-medium text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
              required
              className="placeholder:text-neutral-500 placeholder:italic hover:bg-blue-50 focus:bg-white transition"
            />
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              required
              className="placeholder:text-neutral-500 placeholder:italic hover:bg-blue-50 focus:bg-white transition"
            />
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="placeholder:text-neutral-500 placeholder:italic hover:bg-blue-50 focus:bg-white transition"
            />
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full border rounded-md px-3 py-2 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 transition">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>

              <SelectContent className="bg-white shadow-md rounded-md">
                {selectOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-700 font-bold text-white"
            >
              {submitLabel}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
