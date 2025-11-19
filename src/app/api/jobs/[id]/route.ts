import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    const deletedJob = await Job.findByIdAndDelete(params.id);
    if (!deletedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting job" },
      { status: 500 }
    );
  }
}

// GET one job

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectToDatabase();

  try {
    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching job" },
      { status: 500 }
    );
  }
}

// Update one job

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectToDatabase();

  try {
    const body = await req.json();
    const existingJob = await Job.findById(id);

    if (!existingJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // timeline logic
    const updatedTimeLine = [...(existingJob.timeline || [])];

    // if status changed, record a new timeline
    if (body.status && body.status !== existingJob.status) {
      updatedTimeLine.push({
        stage: `Status changed to ${body.status}`,
        date: new Date().toISOString(),
      });
    }

    // merge updates
    const updatedJob = await Job.findByIdAndUpdate(
      params.id,
      {
        ...body,
        timeline: updatedTimeLine,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating job" },
      { status: 500 }
    );
  }
}
