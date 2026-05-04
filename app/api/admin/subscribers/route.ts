import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json(
      { message: "FAILED_TO_FETCH_SUBSCRIBERS" },
      { status: 500 }
    );
  }
}
