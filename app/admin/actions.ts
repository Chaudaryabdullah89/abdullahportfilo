"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAvailability(isAvailable: boolean) {
  try {
    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: { isAvailable },
      create: { 
        id: "global",
        isAvailable 
      },
    });
    
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update availability:", error);
    return { success: false };
  }
}

export async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}

export async function markAsRead(id: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to mark message as read:", error);
    return { success: false };
  }
}

export async function deleteMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message:", error);
    return { success: false };
  }
}
