"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ConfirmDialogBox } from "./ConfirmDialogBox";

type CalendarProps = {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
  onSave: (date: Date) => void;
  onRemove?: () => void;
  hasReminder?: boolean;
};

export function CalendarModal({
  isOpen,
  onClose,
  initialDate,
  onSave,
  hasReminder,
  onRemove,
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );

  const normalizeDate = (date?: Date) =>
    date
      ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
      : undefined;

  const interviewDate = normalizeDate(initialDate);
  const tempSelectedNormalized = normalizeDate(selectedDate);

  // Keep selectedDate in sync when modal opens
  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate, isOpen]);

  const handleSave = () => {
    if (!selectedDate) return;
    onSave(selectedDate);
    onClose();
  };

  const handleRemove = () => {
    if (onRemove) onRemove();

    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="bg-white max-w-sm 
          p-6 
          rounded-xl 
          shadow-xl 
          border 
          animate-in 
          fade-in-50 
          zoom-in-95"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-blue-900">
              {hasReminder
                ? "Edit Interview Reminder"
                : "Set Interview Reminder"}
            </DialogTitle>
          </DialogHeader>

          <div>
            <Calendar
              mode="single"
              selected={tempSelectedNormalized}
              modifiers={{
                interview: interviewDate ? [interviewDate] : [],
                temp: tempSelectedNormalized ? [tempSelectedNormalized] : [],
              }}
              modifiersClassNames={{
                temp: "bg-blue-100 text-blue-900 font-semibold border border-blue-400",
                interview: "bg-blue-600 text-white font-bold",
              }}
              onSelect={(date) => setSelectedDate(date)}
              classNames={{
                day: "h-10 w-10 flex items-center justify-center rounded-md transition-all hover:bg-blue-100 hover:text-blue-900",
              }}
            />
          </div>

          <div className="mt-4 flex gap-2 justify-end">
            {hasReminder && onRemove && (
              <ConfirmDialogBox
                title="Remove interview reminder?"
                description="This will permanently remove the interview reminder."
                confirmLabel="Remove"
                cancelLabel="Cancel"
                onConfirm={handleRemove}
              >
                {/* This button becomes the DialogTrigger */}
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50 text-xs font-medium"
                >
                  Remove
                </Button>
              </ConfirmDialogBox>
            )}

            <Button
              type="button"
              onClick={handleSave}
              className="bg-blue-900 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
