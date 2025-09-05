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
