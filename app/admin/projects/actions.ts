"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
}

import { broadcastNewContent } from "@/lib/newsletter-service";

export async function createProject(data: {
  title: string;
  category: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  role: string;
  tags: string;
  liveUrl?: string;
  githubUrl?: string;
}) {
  try {
    const project = await prisma.project.create({
      data,
    });

    // Fire-and-forget broadcast (Non-blocking)
    broadcastNewContent("PROJECT", project).catch(e => console.error("Broadcast Error:", e));

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false };
  }
}

export async function updateProject(id: string, data: {
  title: string;
  category: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  role: string;
  tags: string;
  liveUrl?: string;
  githubUrl?: string;
}) {
  try {
    await prisma.project.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false };
  }
}


export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false };
  }
}
