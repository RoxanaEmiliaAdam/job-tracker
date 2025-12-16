import { Clock } from "lucide-react";
import { useState } from "react";
import { CalendarModal } from "./CalendarModal";
import { Button } from "@/components/ui/button";

export function JobTimeline({
  timeline,
  reminder,
  onSaveReminder,
  onRemoveReminder,
}: {
  timeline: { stage: string; date: string }[];
  reminder?: { interviewDate?: string };
  onSaveReminder?: (data: { interviewDate: string }) => void;
  onRemoveReminder?: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);

  if (!timeline || !timeline.length)
    return <p className="italic">No History Available</p>;

  const lastEntry = timeline[timeline.length - 1];
  const restEntries = timeline.slice(0, -1);

  return (
    <div>
      {/* always visible */}
      <div className="border-l-2 border-blue-400 pl-4 space-y-3">
        <div className="relative">
          <div className="absolute -left-[9px] w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <p className="font-semibold">{lastEntry.stage}</p>
          </div>
          <p className="text-sm text-gray-500 ml-6">
            {new Date(lastEntry.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Expandable older history */}
      {showAll && (
        <div className="border-l-2 border-gray-300 pl-4 space-y-3 mb-4">
          {restEntries.map((entry, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[9px] w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <p className="font-semibold">{entry.stage}</p>
              </div>
              <p className="text-sm text-gray-500 ml-6">
                {new Date(entry.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {reminder?.interviewDate && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-900">
          <span>🗓 </span>
          <span className="font-medium">Interview: </span>
          <span className="font-semibold">
            {new Date(reminder.interviewDate).toLocaleDateString()}
          </span>
        </div>
      )}

      {/* Toggle Button */}
      {timeline.length > 1 && (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="text-blue-600 text-sm underline"
        >
          {showAll ? "Hide full history" : "Show full history"}
        </button>
      )}

      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-blue-600 underline mt-2"
      >
        {reminder?.interviewDate
          ? "Edit Interview Reminder"
          : "Set Interview Reminder"}
      </Button>

      <CalendarModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialDate={
          reminder?.interviewDate
            ? new Date(reminder.interviewDate)
            : new Date()
        }
        hasReminder={!!reminder?.interviewDate}
        onSave={(date) =>
          onSaveReminder?.({ interviewDate: date.toISOString() })
        }
        onRemove={onRemoveReminder}
      />
    </div>
  );
}
