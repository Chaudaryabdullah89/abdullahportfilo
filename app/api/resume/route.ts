import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resume data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const experience = await prisma.experience.create({
      data: {
        role: body.role,
        company: body.company,
        period: body.period,
        location: body.location,
        description: body.description,
        order: body.order || 0,
      },
    });
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save experience record" }, { status: 500 });
  }
}
