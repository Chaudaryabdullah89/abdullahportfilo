import { broadcastNewContent } from "../lib/newsletter-service";
import { prisma } from "../lib/prisma";

async function testTransmission() {
  console.log(">>> [INITIATING_TRANSMISSION_TEST]...");

  // 1. Check for subscribers
  const count = await prisma.subscriber.count({ where: { active: true } });
  if (count === 0) {
    console.error("❌ FAILURE: No active subscribers found in database. Add your email via the Blogs page first!");
    return;
  }

  console.log(`📡 TARGETS_DETECTED: ${count} active subscribers.`);

  // 2. Simulate new content
  const testBlog = {
    id: "test-id",
    title: "TEST_TRANSMISSION: Mechanical Integrity",
    category: "System Test",
    summary: "This is a diagnostic broadcast to verify the automated email pipeline.",
  };

  try {
    console.log("🚀 DISPATCHING_BLAST...");
    await broadcastNewContent("BLOG", testBlog);
    console.log("✅ SUCCESS: Transmission protocol completed. Check your inbox!");
  } catch (error) {
    console.error("❌ CRITICAL_FAILURE:", error);
  }
}

testTransmission()
  .finally(async () => {
    await prisma.$disconnect();
  });
