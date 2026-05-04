"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { broadcastNewContent } from "@/lib/newsletter-service";

export async function getBlogs() {
  return await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createBlog(data: {
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  tags: string;
  readTime: string;
  date: string;
  author: string;
}) {
  try {
    const blog = await prisma.blog.create({
      data,
    });

    // Fire-and-forget broadcast (Non-blocking for high-speed admin UX)
    broadcastNewContent("BLOG", blog).catch(e => console.error("Broadcast Error:", e));

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create blog:", error);
    return { success: false };
  }
}

export async function updateBlog(id: string, data: {
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  tags: string;
  readTime: string;
  date: string;
  author: string;
}) {
  try {
    await prisma.blog.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/blogs");
    revalidatePath(`/blogs/${id}`);
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update blog:", error);
    return { success: false };
  }
}


export async function deleteBlog(id: string) {
  try {
    await prisma.blog.delete({
      where: { id },
    });
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return { success: false };
  }
}
