const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const usersCount = await prisma.user.count();
  
  if (usersCount === 0) {
    console.log("🚀 [SEED]: Creating initial admin user...");
    
    // Default credentials from your auth.ts
    const email = "admin@portfolio.com";
    const username = "admin";
    const password = "admin123";
    
    // Using email as the primary login since Prisma schema uses unique email
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: {
        name: "Muhammad Abdullah",
        email: email,
        password: hashedPassword,
      },
    });
    
    console.log("✅ [SEED_SUCCESS]: Admin user created.");
    console.log("   Email:", email);
    console.log("   Password:", password);
  } else {
    console.log("ℹ️ [SEED]: Users already exist. Skipping seed.");
  }
}

main()
  .catch(e => {
    console.error("❌ [SEED_ERROR]:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
