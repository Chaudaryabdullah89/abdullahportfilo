import { prisma } from "./prisma";
import { sendEmail } from "./mail";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const BRAND_NAME = "Muhammad ";
const SUBJECT_PREFIX = `[${BRAND_NAME}Abdullah]`;

/**
 * High-Fidelity Base Template
 * Standardizes typography, spacing, and signature across all system emails.
 */
function getBaseTemplate(title: string, content: string, actionLabel?: string, actionUrl?: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 50px 40px; color: #1a1a1a; max-width: 600px; margin: 0 auto; line-height: 1.7; background-color: #ffffff; border: 1px solid #f0f0f0; border-radius: 12px;">
      <!-- Brand Header -->
      <div style="margin-bottom: 40px; border-bottom: 1px solid #f0f0f0; padding-bottom: 25px;">
        <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.04em;">
          ${BRAND_NAME} <span style="font-weight: 400; opacity: 0.4;">Abdullah</span>
        </span>
      </div>

      <!-- Main Content Area -->
      <div style="margin-bottom: 50px;">
        <h1 style="font-size: 26px; font-weight: 800; margin: 0 0 20px 0; letter-spacing: -0.03em; line-height: 1.2;">
          ${title}
        </h1>
        <div style="font-size: 15px; color: #444; margin-bottom: 35px; font-weight: 400;">
          ${content}
        </div>
        
        ${actionLabel && actionUrl ? `
          <a href="${actionUrl}" style="display: inline-block; padding: 14px 28px; background: #1a1a1a; color: #fff; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 8px;">
            ${actionLabel}
          </a>
        ` : ''}
      </div>

      <!-- Standardized Signature -->
      <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #f0f0f0;">
        <div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">Muhammad Abdullah</div>
        <div style="font-size: 12px; color: #999; margin-bottom: 20px;">Full Stack Software Engineer</div>
        
        <div style="font-size: 11px; color: #bbb;">
          <a href="${SITE_URL}" style="color: #bbb; text-decoration: none;">Visit My Portfolio</a> &nbsp;•&nbsp; 
          <a href="${SITE_URL}/blogs" style="color: #bbb; text-decoration: none;">Read My Blog</a>
        </div>
      </div>
    </div>
  `;
}

export async function broadcastNewContent(type: "BLOG" | "PROJECT", content: any) {
  try {
    const subscribers = await prisma.subscriber.findMany({
      where: { active: true },
      select: { email: true }
    });

    if (subscribers.length === 0) return;

    const emails = subscribers.map(s => s.email);
    const subject = `New ${type === "BLOG" ? 'Blog Post' : 'Project'}: ${content.title}`;
    const url = type === "BLOG" ? `${SITE_URL}/blogs/${content.id}` : `${SITE_URL}/projects`;
    
    const bodyContent = `
      <p style="font-size: 12px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 15px;">New Update</p>
      <p style="margin: 0;">
        ${content.summary || content.description || 'I just shared a new update on my portfolio. Take a look!'}
      </p>
    `;

    const html = getBaseTemplate(content.title, bodyContent, `Click to Read`, url);

    for (const email of emails) {
      await sendEmail({
        to: email,
        subject,
        text: `New ${type}: ${content.title}. Link: ${url}`,
        html
      });
    }
  } catch (error) {
    console.error(">>> [BROADCAST_FAILURE]:", error);
  }
}

export async function sendWelcomeEmail(email: string) {
  try {
    const subject = `Welcome to my Newsletter!`;
    const bodyContent = `
      <p style="margin-bottom: 15px;">Thanks for subscribing! I’ll send you occasional updates when I post new projects or technical articles.</p>
      <p style="margin: 0;">I'm glad to have you here.</p>
    `;

    const html = getBaseTemplate("You’re all set!", bodyContent, "Go to Portfolio", SITE_URL);

    await sendEmail({
      to: email,
      subject,
      text: `Thanks for subscribing to my newsletter.`,
      html
    });
  } catch (error) {
    console.error(">>> [WELCOME_FAILURE]:", error);
  }
}
