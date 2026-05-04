import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects - Fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST /api/projects - Create a new project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        category: body.category,
        image: body.image,
        description: body.description,
        markdown: body.markdown || "",
        tags: body.tags || "",
        liveUrl: body.liveUrl,
        githubUrl: body.githubUrl,
        order: body.order || 0,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
