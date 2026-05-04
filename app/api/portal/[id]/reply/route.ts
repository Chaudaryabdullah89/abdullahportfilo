import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";
import { cookies } from "next/headers";
import { auth } from "@/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { content } = await req.json();

    if (!id || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Identify Identity (Bypass cookie if Admin session)
    const session = await auth();
    const isAdmin = !!session?.user;

    const cookieStore = await cookies();
    const authToken = cookieStore.get(`portal_auth_${id}`)?.value;

    const inquiry = await prisma.contactMessage.findUnique({
      where: { id },
      select: { portalToken: true, name: true, email: true }
    });

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    if (!isAdmin && (!inquiry.portalToken || authToken !== inquiry.portalToken)) {
      return NextResponse.json({ error: "Unauthorized access or invalid token" }, { status: 403 });
    }

    // 2. Log response and update status
    const [newUpdate] = await prisma.$transaction([
      prisma.messageUpdate.create({
        data: {
          messageId: id,
          sender: isAdmin ? "admin" : "user",
          content,
        },
      }),
      prisma.contactMessage.update({
        where: { id },
        data: {
          read: isAdmin ? true : false,
          replied: isAdmin ? true : false,
        },
      }),
    ]);

    // 3. Smart Notifications
    if (isAdmin) {
      const portalLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portal/${id}?token=${inquiry.portalToken}`;
      await sendEmail({
        to: inquiry.email,
        subject: "New response from Muhammad Abdullah",
        text: `I have posted a new response to our project conversation: ${content}\n\nReview here: ${portalLink}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1a1a1a; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #f0f0f0; border-radius: 12px;">
            <p style="text-transform: uppercase; font-size: 10px; font-weight: 800; color: #888; margin-bottom: 25px;">Professional Update</p>
            <h2 style="font-size: 22px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 30px;">Muhammad Abdullah has replied.</h2>
            <p style="font-size: 14px; color: #666; margin-bottom: 25px;">I've added a new update to our ongoing collaboration regarding your project inquiry.</p>
            <div style="background: #fafafa; padding: 30px; border-radius: 16px; border: 1px solid #f0f0f0; margin-bottom: 35px;">
               <p style="font-size: 14px; line-height: 1.6; color: #333; margin: 0;">"${content}"</p>
            </div>
            <div style="margin-bottom: 40px; text-align: center;">
               <a href="${portalLink}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
                  Open Collaboration Portal
               </a>
            </div>
            <div style="border-top: 1px solid #f0f0f0; padding-top: 25px;">
              <p style="font-size: 12px; font-weight: 700; color: #1a1a1a; margin: 0;">Muhammad Abdullah</p>
              <p style="font-size: 10px; color: #bbb;">Full Stack Software Engineer</p>
            </div>
          </div>
        `
      });
    } else {
      await sendEmail({
        to: process.env.EMAIL_RECEIVER || "",
        subject: `New message from ${inquiry.name}`,
        text: `${inquiry.name} has replied to your message on the project portal.\n\nMessage:\n${content}\n\nView this in your dashboard.`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1a1a1a; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #f0f0f0; border-radius: 12px;">
            <p style="text-transform: uppercase; font-size: 10px; font-weight: 800; color: #888; margin-bottom: 25px;">New message in your portal</p>
            <h2 style="font-size: 22px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 30px;">${inquiry.name} has sent a reply.</h2>
            <p style="font-size: 14px; color: #666; margin-bottom: 25px;">You have a new response from <strong>${inquiry.name}</strong> regarding the project consultation.</p>
            <div style="background: #fafafa; padding: 30px; border-radius: 16px; border: 1px solid #f0f0f0; margin-bottom: 35px;">
               <p style="font-size: 11px; font-weight: 700; color: #1a1a1a; text-transform: uppercase; margin-bottom: 12px;">Message</p>
               <p style="font-size: 14px; line-height: 1.6; color: #333; margin: 0; font-style: italic;">"${content}"</p>
            </div>
            <div style="margin-bottom: 40px;">
               <a href="${new URL(req.url).origin}/admin/inquiries" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
                  Open Dashboard to Respond
               </a>
            </div>
            <div style="border-top: 1px solid #f0f0f0; padding-top: 25px;">
              <p style="font-size: 12px; font-weight: 700; color: #1a1a1a; margin: 0;">Automated Notification</p>
              <p style="font-size: 10px; color: #bbb;">Personal Portfolio System</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, data: newUpdate });

  } catch (error) {
    console.error("PORTAL_DISPATCH_FAILURE:", error);
    return NextResponse.json({ error: "INTERNAL_DISPATCH_ERROR" }, { status: 500 });
  }
}
