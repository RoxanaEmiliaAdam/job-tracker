"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MyListButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("my-list")}
      className="bg-blue-900 font-bold italic text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      My List
    </Button>
  );
}
