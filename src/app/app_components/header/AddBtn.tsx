"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddJobButton() {
  return (
    <Button
      asChild
      className="bg-blue-900 font-bold italic text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      <Link href="/add-job">Add Job</Link>
    </Button>
  );
}
