import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!id || !token) {
    return NextResponse.json({ error: "Invalid auth request" }, { status: 400 });
  }

  try {
    const inquiry = await prisma.contactMessage.findUnique({
      where: { id },
      select: { portalToken: true }
    });

    if (!inquiry || inquiry.portalToken !== token) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }

    // Set Secure Auth Cookie
    const cookieStore = await cookies();
    cookieStore.set(`portal_auth_${id}`, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    // Redirect to the portal
    return NextResponse.redirect(new URL(`/portal/${id}`, req.url));
  } catch (error) {
    console.error(">>> [PORTAL_AUTH_FAILURE]:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
