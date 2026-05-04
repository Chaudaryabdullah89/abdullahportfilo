import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log(">>> [RECOVERY_REQUEST]:", email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find the latest inquiry for this email
    const latestInquiry = await prisma.contactMessage.findFirst({
      where: { email: email }, // Standard filter for SQLite
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(">>> [RECOVERY_MATCH_FOUND]:", latestInquiry ? "YES" : "NO");

    if (!latestInquiry) {
      // Return a 404 but maybe with a friendly message that they should start a new inquiry
      return NextResponse.json({ 
        error: "No conversation found", 
        found: false 
      }, { status: 404 });
    }

    // Generate/Reuse portal token
    let token = latestInquiry.portalToken;
    if (!token) {
      token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      await prisma.contactMessage.update({
        where: { id: latestInquiry.id },
        data: { portalToken: token }
      });
    }

    const portalLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portal/${latestInquiry.id}?token=${token}`;

    // Send the recovery email
    await sendEmail({
      to: email,
      subject: `Portal Access Link - Muhammad Abdullah`,
      text: `Hello, here is your secure link to access our conversation: ${portalLink}\n\nAccess Token: ${token}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 50px; color: #1a1a1a; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #f0f0f0; border-radius: 12px;">
          <p style="text-transform: uppercase; font-size: 10px; font-weight: 800; color: #888; margin-bottom: 30px;">Access Recovery</p>
          <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 20px;">Your secure link is here.</h2>
          
          <p style="font-size: 14px; color: #666; margin-bottom: 40px;">I've located your conversation regarding <strong>${latestInquiry.projectType || 'our collaboration'}</strong>. Click the link below to unlock your personal portal.</p>

          <div style="margin-bottom: 45px; padding: 30px; background: #fafafa; border-radius: 12px; border: 1px solid #f0f0f0; text-align: center;">
             <p style="font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 10px;">Secure Access Token</p>
             <p style="font-size: 18px; font-weight: 800; color: #1a1a1a; letter-spacing: 0.15em; margin-bottom: 25px; font-family: monospace;">${token}</p>
             
             <a href="${portalLink}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 8px;">
                Unlock Portal
             </a>
          </div>

          <div style="border-top: 1px solid #f0f0f0; padding-top: 30px;">
            <p style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin: 0;">Muhammad Abdullah</p>
            <p style="font-size: 12px; color: #999; margin: 0;">Full Stack Software Engineer</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ 
      success: true, 
      message: "Recovery link sent to your email" 
    });
  } catch (error) {
    console.error(">>> [RECOVERY_FAILURE]:", error);
    return NextResponse.json({ error: "Failed to process recovery" }, { status: 500 });
  }
}
