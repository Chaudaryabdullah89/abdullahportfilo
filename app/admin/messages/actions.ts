"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMessage(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id }
    });
    revalidatePath("/admin/messages");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message:", error);
    return { success: false };
  }
}

export async function markAsRead(id: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { read: true }
    });
    revalidatePath("/admin/messages");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to mark message as read:", error);
    return { success: false };
  }
}
