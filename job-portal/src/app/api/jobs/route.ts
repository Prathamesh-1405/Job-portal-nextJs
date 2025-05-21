import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Job from "@/model/Job";
// import Company from "@/model/Company";

export const GET = async () => {
  try {
    await connectDB();
    const jobs = await Job.find().populate("company");
    
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
};



export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { title, description, location, type, company, salaryRange, skillsRequired, postedBy } = await req.json();

    if (!title || !location || !type || !company || !postedBy) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const newJob = await Job.create({
      title,
      description,
      location,
      type,
      company,
      salaryRange,
      skillsRequired,
      postedBy,
    });

    return NextResponse.json({ success: true, data: newJob }, { status: 201 });
  } catch (error) {
    console.error("Failed to create job:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create job" },
      { status: 500 }
    );
  }
};
