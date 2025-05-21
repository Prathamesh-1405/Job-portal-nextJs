import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Company from "@/model/Company";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { name, description, website, logo, location } = await req.json();

    if (!name || !location) {
      return NextResponse.json(
        { success: false, message: "Name and location are required" },
        { status: 400 }
      );
    }

    const newCompany = await Company.create({
      name,
      description,
      website,
      logo,
      location,
    });

    return NextResponse.json({ success: true, data: newCompany }, { status: 201 });
  } catch (error) {
    console.error("Failed to create company:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create company" },
      { status: 500 }
    );
  }
};
