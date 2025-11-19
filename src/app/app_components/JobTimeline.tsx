import { Clock } from "lucide-react";

export function JobTimeline({
  timeline,
}: {
  timeline: { stage: string; date: string }[];
}) {
  if (!timeline || !timeline.length)
    return <p className="italic">No History Available</p>;

  console.log("JobTimeline entries:", timeline);

  return (
    <div className="border-l-2 border-blue-400 pl-4 space-y-3">
      {timeline.map((entry, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-[9px] w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <p className="font-semibold">{entry.stage}</p>
          </div>
          <p className="text-sm text-gray-500 ml-6">
            {new Date(entry.date).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
