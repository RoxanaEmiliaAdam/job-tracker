"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type BannerProps = {
  jobId: string;
  company: string;
  title: string;
  interviewDate?: string;
};

export default function InterviewBanner({
  jobId,
  title,
  company,
  interviewDate,
}: BannerProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!interviewDate) return;

    const checkVisibility = () => {
      const snoozeKey = `snooze-interview-${jobId}`;
      const snoozeValue = sessionStorage.getItem(snoozeKey);
      const now = Date.now();

      const interviewTime = new Date(interviewDate).getTime();
      const diffHours = (interviewTime - now) / (1000 * 60 * 60);

      if (
        diffHours > 0 &&
        diffHours <= 48 &&
        (!snoozeValue || now > +snoozeValue)
      ) {
        setVisible(true);
      }
    };

    checkVisibility();

    const interval = setInterval(checkVisibility, 1000);

    return () => clearInterval(interval);
  }, [interviewDate, jobId]);

  if (!visible) return null;

  const closeBanner = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 200);
  };

  const snooze3h = () => {
    //const snoozeUntil = new Date().getTime() + 3 * 60 * 60 * 1000;

    // test 5 secs
    const snoozeUntil = new Date().getTime() + 5 * 1000;

    sessionStorage.setItem(`snooze-interview-${jobId}`, snoozeUntil.toString());
    closeBanner();
  };

  return (
    <div
      className={`bg-blue-50 border-b border-blue-200 px-4 py-2 flex items-center justify-between text-sm text-blue-900 animate-in slide-in-from-top fade-in duration-400
    ${closing ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`}
    >
      <div>
        <span className="font-semibold">📅 Interview within 48h:</span> {title}{" "}
        @ {company}
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={snooze3h}
          className="text-yellow-600 border-yellow-900 hover:bg-yellow-50"
        >
          Snooze
        </Button>
        <Button
          size="sm"
          onClick={closeBanner}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          X
        </Button>
      </div>
    </div>
  );
}
