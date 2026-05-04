"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "global" }
    });
    return settings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

export async function updateSettings(data: any) {
  try {
    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: data,
      create: {
        id: "global",
        ...data
      }
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: "PROTOCOL_WRITE_FAILURE" };
  }
}
