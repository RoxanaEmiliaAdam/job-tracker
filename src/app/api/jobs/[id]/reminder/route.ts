import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Job from "@/models/Job";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = await params.id;

  await connectToDatabase();

  try {
    const body = await req.json();

    if (!body.interviewDate) {
      return NextResponse.json(
        { message: "Missing interviewDate" },
        { status: 400 }
      );
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { reminder: { interviewDate: body.interviewDate } },
      { new: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to save reminder" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    const job = await Job.findById(params.id);

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    job.reminder = null;
    await job.save();

    return NextResponse.json(
      { message: "Reminder removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to remove reminder" },
      { status: 500 }
    );
  }
}
