"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getExperience() {
  return await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createExperience(data: {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  order: number;
}) {
  try {
    await prisma.experience.create({
      data,
    });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create experience:", error);
    return { success: false };
  }
}

export async function updateExperience(id: string, data: {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  order: number;
}) {
  try {
    await prisma.experience.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update experience:", error);
    return { success: false };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({
      where: { id },
    });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return { success: false };
  }
}
