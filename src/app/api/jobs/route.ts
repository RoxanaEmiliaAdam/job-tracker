import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/models/Job";
import { FilterQuery, SortOrder } from "mongoose";
import { FetchJobsParams } from "@/lib/types/fetchJobs";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const url = new URL(req.url);

  // extract params
  const params: FetchJobsParams & { page?: number; pageSize?: number } = {
    search: url.searchParams.get("search") ?? "",
    status: url.searchParams.get("status") ?? "",
    sortBy: url.searchParams.get("sortBy") ?? "",
    sortOrder: (url.searchParams.get("sortOrder") as "asc" | "desc") ?? "asc",
    page: parseInt(url.searchParams.get("page") ?? "1", 10),
    pageSize: parseInt(url.searchParams.get("pageSize") ?? "5", 10),
  };

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 5;
  const skip = (page - 1) * pageSize;

  // build query object using FilterQuery<Job>; add filters dinamically
  const query: FilterQuery<typeof Job> = {};
  if (params.status) query.status = params.status;
  if (params.search) {
    query.$or = [
      { title: { $regex: params.search, $options: "i" } },
      { company: { $regex: params.search, $options: "i" } },
      { location: { $regex: params.search, $options: "i" } },
    ];
  }

  // build sort object using Record<string, SortOrder>
  const sortObj: Record<string, SortOrder> = {};
  if (params.sortBy)
    sortObj[params.sortBy] = params.sortOrder === "desc" ? -1 : 1;

  try {
    const [items, totalCount] = await Promise.all([
      Job.find(query).sort(sortObj).skip(skip).limit(pageSize),
      Job.countDocuments(query),
    ]);

    return NextResponse.json({ items, totalCount });
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
