import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/models/Job";
import { FilterQuery, SortOrder } from "mongoose";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const status = url.searchParams.get("status") || "";
  const sort = url.searchParams.get("sort") || "";
  const order = url.searchParams.get("order") || "asc";

  // build query object using FilterQuery<Job>
  const query: FilterQuery<typeof Job> = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  // build sort object using Record<string, SortOrder>
  const sortObj: Record<string, SortOrder> = {};
  if (sort) sortObj[sort] = order === "desc" ? -1 : 1;

  try {
    const jobs = await Job.find(query).sort(sortObj); // no any needed
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newJob = await Job.create(data);
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
