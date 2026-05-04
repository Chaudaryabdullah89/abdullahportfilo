import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.subscriber.delete({
      where: { id }
    });
    return NextResponse.json({ message: "LINK_SEVERED_SUCCESSFULLY" });
  } catch (error) {
    return NextResponse.json(
      { message: "FAILED_TO_SEVER_LINK" },
      { status: 500 }
    );
  }
}
