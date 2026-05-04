"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { name: string, email: string, password?: string }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized access" };
    }

    const currentEmail = session.user.email as string;

    // Check if the new email is already taken by someone else
    if (data.email !== currentEmail) {
      const existing = await prisma.user.findUnique({
        where: { email: data.email }
      });
      if (existing) {
        return { success: false, error: "Email is already registered to another user." };
      }
    }

    const updateData: any = {
      name: data.name,
      email: data.email,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await prisma.user.update({
      where: { email: currentEmail },
      data: updateData
    });

    revalidatePath("/admin/profile");
    return { success: true };

  } catch (error) {
    console.error(">>> [PROFILE_UPDATE_FAILURE]:", error);
    return { success: false, error: "Failed to update registry settings." };
  }
}
