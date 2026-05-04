import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/newsletter-service";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "INVALID_EMAIL_PROTOCOL" },
        { status: 400 }
      );
    }

    // Check for existing subscription
    const existing = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { message: "INSTANCE_ALREADY_CONNECTED" },
          { status: 400 }
        );
      } else {
        // Re-activate if they were unsubscribed
        await prisma.subscriber.update({
          where: { email },
          data: { active: true }
        });
        
        // Send re-activation welcome
        await sendWelcomeEmail(email);

        return NextResponse.json({ message: "PROTOCOL_REESTABLISHED" });
      }
    }

    // Create new subscriber
    await prisma.subscriber.create({
      data: { email }
    });

    // Send welcome email
    await sendWelcomeEmail(email);

    return NextResponse.json({ message: "SYNC_PROTOCOL_ESTABLISHED" });
  } catch (error) {
    console.error(">>> [NEWSLETTER_FAILURE]:", error);
    return NextResponse.json(
      { message: "INTERNAL_CORE_FAILURE" },
      { status: 500 }
    );
  }
}
