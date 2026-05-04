import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { messageId, responseText } = await req.json();

    if (!messageId || !responseText) {
      return NextResponse.json({ error: "Missing payload data." }, { status: 400 });
    }

    // 1. Fetch original inquiry
    const originalMessage = await prisma.contactMessage.findUnique({
      where: { id: messageId },
    });

    if (!originalMessage) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    // Generate portalToken
    const portalToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // 2. Update Registry and Create Thread
    const updatedMessage = await prisma.contactMessage.update({
      where: { id: messageId },
      data: {
        replied: true,
        responseBody: responseText,
        respondedAt: new Date(),
        read: true,
        portalToken,
        thread: {
          create: {
            sender: "admin",
            content: responseText,
          },
        },
      },
    });

    // 3. Dispatch Reply via Nodemailer
    const portalLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portal/${messageId}?token=${portalToken}`;

    await sendEmail({
      to: originalMessage.email,
      subject: `Re: Your Inquiry - Muhammad Abdullah`,
      text: `${responseText}\n\nView my reply here: ${portalLink}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 50px; color: #1a1a1a; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #f0f0f0; border-radius: 12px;">
          <p style="text-transform: uppercase; font-size: 10px; font-weight: 800; color: #888; margin-bottom: 30px;">Direct Message</p>
          
          <div style="font-size: 16px; line-height: 1.7; color: #1a1a1a; margin-bottom: 45px; white-space: pre-wrap;">
            ${responseText}
          </div>

          <div style="margin-bottom: 45px; padding: 30px; background: #fafafa; border-radius: 12px; border: 1px solid #f0f0f0;">
             <p style="font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 15px; text-align: center;">Secure Access Token</p>
             <p style="font-size: 18px; font-weight: 800; color: #000; letter-spacing: 0.15em; text-align: center; margin-bottom: 25px; font-family: monospace;">${portalToken}</p>
             
             <div style="text-align: center;">
               <a href="${portalLink}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
                  Open Secure Portal
               </a>
             </div>
             <p style="font-size: 11px; color: #999; margin-top: 15px; text-align: center;">Use the token above if you're asked for access on a new device.</p>
          </div>

          <div style="border-top: 1px solid #f0f0f0; padding-top: 30px;">
            <p style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin: 0;">Muhammad Abdullah</p>
            <p style="font-size: 12px; color: #999; margin: 0;">Full Stack Software Engineer</p>
          </div>
        </div>
      `,
    });

    // 3. Update Registry and Create Thread
    const [updatedMessage] = await prisma.$transaction([
      prisma.contactMessage.update({
        where: { id: messageId },
        data: {
          replied: true,
          responseBody: responseText,
          respondedAt: new Date(),
          read: true, 
        },
      }),
      prisma.messageUpdate.create({
        data: {
          messageId,
          sender: "admin",
          content: responseText,
        },
      }),
    ]);

    return NextResponse.json({ 
      success: true, 
      message: "RESPONSE_SUCCESSFULLY_DISPATCHED",
      data: updatedMessage 
    });

  } catch (error) {
    console.error("RESPONSE_SYSTEM_FAILURE:", error);
    return NextResponse.json({ error: "INTERNAL_UPLINK_ERROR" }, { status: 500 });
  }
}
