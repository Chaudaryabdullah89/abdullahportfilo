import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, projectType, budget } = await req.json();

    if (!name || !email || (!message && !projectType)) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Generate initial portal token
    const portalToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // 1. Save to Database
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        message: message || `Inquiry for ${projectType}`,
        projectType,
        budget,
        portalToken, // New: Store initial token
      },
    });

    // 2. Send Email to Administrator
    await sendEmail({
      to: process.env.EMAIL_RECEIVER || "",
      subject: `New Message: ${name} [${projectType || "General"}]`,
      text: `New project inquiry from ${name} (${email}).\nBudget: ${budget || "TBD"}\nMessage: ${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1a1a1a; max-width: 600px; margin: 0 auto; background: #fff;">
          <p style="text-transform: uppercase; font-size: 10px; font-weight: 800; color: #888; margin-bottom: 20px;">New Inquiry Received</p>
          <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 30px;">You have a new message.</h2>
          
          <div style="border-top: 1px solid #f0f0f0; padding-top: 30px; margin-bottom: 40px;">
            <div style="margin-bottom: 25px;">
              <p style="font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 5px;">From</p>
              <p style="font-size: 15px; font-weight: 500; margin: 0;">${name} &lt;${email}&gt;</p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <p style="font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 5px;">Project Type</p>
              <p style="font-size: 15px; font-weight: 500; margin: 0;">${projectType || "General Consultation"}</p>
            </div>

            <div style="margin-bottom: 25px;">
              <p style="font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 5px;">Budget</p>
              <p style="font-size: 15px; font-weight: 500; margin: 0;">${budget || "To be decided"}</p>
            </div>

            <div style="background: #fdfdfd; padding: 25px; border-radius: 12px; border: 1px solid #f0f0f0;">
              <p style="font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 10px;">Message</p>
              <p style="font-size: 14px; line-height: 1.6; color: #444; margin: 0;">"${message}"</p>
            </div>
          </div>

          <a href="${new URL(req.url).origin}/admin/inquiries" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 28px; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 8px;">View in Dashboard</a>
        </div>
      `,
    });

    // 3. Send Auto-reply to User with Snapshot
    await sendEmail({
      to: email,
      subject: `I've received your message - ${name}`,
      text: `Hi ${name},\n\nThank you for reaching out! I've received your message and will get back to you within 24 hours.\n\nBest regards,\nMuhammad Abdullah`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1a1a1a; max-width: 600px; margin: 0 auto; background: #fff;">
          <p style="text-transform: uppercase; font-size: 10px; font-weight: 800; color: #888; margin-bottom: 20px;">Message Confirmation</p>
          <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 10px;">Thanks for reaching out.</h2>
          <p style="font-size: 14px; color: #666; margin-bottom: 40px;">Hello ${name}, I've received your inquiry and I'm currently reviewing the details. I'll get back to you as soon as possible.</p>
          
          <div style="background: #fafafa; padding: 30px; border-radius: 16px; border: 1px solid #f0f0f0; margin-bottom: 40px;">
            <p style="font-size: 10px; font-weight: 800; color: #aaa; text-transform: uppercase; margin-bottom: 20px;">Reference Number: #${newMessage.id.slice(-8).toUpperCase()}</p>
            
            <div style="margin-bottom: 20px;">
              <p style="font-size: 11px; font-weight: 700; color: #1a1a1a; text-transform: uppercase; margin-bottom: 4px;">Interested in</p>
              <p style="font-size: 14px; color: #555; margin: 0;">${projectType || "General Consultation"}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="font-size: 11px; font-weight: 700; color: #1a1a1a; text-transform: uppercase; margin-bottom: 4px;">Estimated Budget</p>
              <p style="font-size: 14px; color: #555; margin: 0;">${budget || "To be discussed"}</p>
            </div>
            
            <div>
              <p style="font-size: 11px; font-weight: 700; color: #1a1a1a; text-transform: uppercase; margin-bottom: 4px;">Your Message</p>
              <p style="font-size: 13px; color: #777; line-height: 1.6; margin: 0; font-style: italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
            </div>
          </div>

          <div style="margin-bottom: 40px; padding: 25px; background: #fafafa; border: 1px solid #f0f0f0; border-radius: 12px; text-align: center;">
             <p style="font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 10px;">Your Secure Access Token</p>
             <p style="font-size: 18px; font-weight: 800; color: #1a1a1a; letter-spacing: 0.1em; margin-bottom: 20px; font-family: monospace;">${portalToken}</p>
             <a href="${new URL(req.url).origin}/portal/${newMessage.id}?token=${portalToken}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
                Open Secure Portal
             </a>
          </div>

          <p style="font-size: 14px; color: #666; margin-bottom: 40px;">I'll read through your requirements and aim to respond within 24 hours to discuss the next steps.</p>
          
          <div style="border-top: 1px solid #f0f0f0; padding-top: 25px;">
            <p style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin: 0;">Muhammad Abdullah</p>
            <p style="font-size: 12px; color: #999; margin: 0;">Full Stack Software Engineer</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Message sent successfully!", data: newMessage },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
