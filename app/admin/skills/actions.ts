"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createSkill(data: {
  name: string;
  category: string;
  icon: string;
  order: number;
}) {
  try {
    await prisma.skill.create({
      data,
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create skill:", error);
    return { success: false };
  }
}

export async function updateSkill(id: string, data: {
  name: string;
  category: string;
  icon: string;
  order: number;
}) {
  try {
    await prisma.skill.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update skill:", error);
    return { success: false };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({
      where: { id },
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return { success: false };
  }
}
