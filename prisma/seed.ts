import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Initiating Professional Data Sync...");

  // 1. Update Site Settings (Bio & Identity)
  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: {
      heroName: "Muhammad Abdullah",
      heroTitle: "Full-Stack Developer",
      heroBadge: "Available for Hire",
      metaTitle: "Muhammad Abdullah | Software Engineer",
      metaDescription: "Full-Stack Developer specializing in React, Next.js, and Node.js.",
      githubUrl: "https://github.com/Chaudaryabdullah89",
      linkedinUrl: "https://www.linkedin.com/in/ch-abdullah-aa8709329/",
    },
    create: {
      id: "global",
      heroName: "Muhammad Abdullah",
      heroTitle: "Full-Stack Developer",
      heroBadge: "Available for Hire",
      metaTitle: "Muhammad Abdullah | Software Engineer",
      metaDescription: "Full-Stack Developer specializing in React, Next.js, and Node.js.",
      githubUrl: "https://github.com/Chaudaryabdullah89",
      linkedinUrl: "https://www.linkedin.com/in/ch-abdullah-aa8709329/",
    },
  });

  // 2. Sync Experience Milestones
  const experienceData = [
    {
      role: "Web Developer (Internship)",
      company: "Prodigy InfoTech",
      period: "Oct 2023 - Oct 2024",
      location: "Remote",
      description: "Focused on responsive web design and building complex, user-centric web applications during a year-long intensive internship.",
      order: 1,
    },
    {
      role: "Freelance Web Developer",
      company: "Retro Studios",
      period: "Aug 2023 - Sep 2024",
      location: "Islamabad, PK",
      description: "Developed and maintained the Retro Smart PAS2035 Consultancy platform, implementing high-end animations and optimized codebases.",
      order: 2,
    },
  ];

  for (const exp of experienceData) {
    await prisma.experience.create({ data: exp });
  }

  // 3. Sync Strategic Projects
  const projectData = [
    {
      title: "Hostel Management System",
      category: "Full-Stack Web App",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
      description: "A comprehensive digital solution for hostel operations, featuring student records, financial tracking, and real-time inventory management.",
      challenge: "Managing complex relational data between rooms, students, and payments while maintaining high performance.",
      solution: "Implemented a robust Next.js and Prisma architecture with optimized database queries and a clean minimalist dashboard.",
      results: "Significantly reduced administrative overhead for hostel wardens through automated receipting and tracking.",
      role: "Lead Developer",
      tags: "Next.js, Prisma, Tailwind, Node.js",
      liveUrl: "#",
      githubUrl: "https://github.com/Chaudaryabdullah89",
      order: 1,
    },
    {
      title: "Shoes Store Ecommerce",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
      description: "A premium footwear shopping experience featuring real-time inventory, user authentication, and a cinematic checkout flow.",
      challenge: "Creating a high-end visual experience that performs well on mobile devices with high-resolution imagery.",
      solution: "Used Next.js image optimization and GSAP for micro-animations to create a premium feel without sacrificing speed.",
      results: "Achieved high lighthouse scores while maintaining a 'Cyber-Artisan' aesthetic.",
      role: "Full-Stack Developer",
      tags: "React, Express, MongoDB, Tailwind",
      liveUrl: "#",
      githubUrl: "https://github.com/Chaudaryabdullah89",
      order: 2,
    },
    {
      title: "Retro Smart Clone",
      category: "Frontend UI/UX",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
      description: "A high-fidelity clone of a world-class award-winning portfolio, focusing on advanced GSAP animations and smooth scrolling.",
      challenge: "Implementing complex Locomotive Scroll and GSAP scrub animations that work across different screen sizes.",
      solution: "Customized GSAP timelines and refined the animation triggers for a seamless cinematic user experience.",
      results: "Successfully replicated high-end motion design patterns used in top industrial portfolios.",
      role: "Frontend Engineer",
      tags: "JavaScript, GSAP, Locomotive Scroll, CSS3",
      liveUrl: "#",
      githubUrl: "https://github.com/Chaudaryabdullah89",
      order: 3,
    },
  ];

  for (const project of projectData) {
    await prisma.project.create({ data: project });
  }

  // 4. Sync Strategic Insights (Detailed Blogs)
  const blogData = [
    {
      title: "The Architecture of Mechanical UI",
      category: "Design Systems",
      summary: "Exploring the intersection of industrial design and digital interfaces. A deep dive into high-contrast grids, heavy typography, and motion physics that feel tactile.",
      content: `
        ## The Industrial Shift
        Digital design is moving away from the soft, airbrushed interfaces of the past decade toward something more rigid and grounded. We call this **Mechanical UI**.

        ## Core Principles
        1. **High Contrast Isolation**: No more subtle grays. We use stark black and white to create clear visual hierarchies.
        2. **Physics-Based Motion**: Animations shouldn't just fade; they should shutter, bounce, and react like physical machinery.
        3. **Monospaced Technicality**: Using fonts like JetBrains Mono to give the user a sense of "Telemetry" rather than just "Reading".

        ## Implementation Strategy
        Using GSAP and Tailwind CSS, we can build interfaces that feel both awarded and industrial. This portfolio is a living testament to that methodology.
      `,
      tags: "UI/UX, GSAP, Next.js, Design",
      readTime: "8 min read",
      author: "Muhammad Abdullah",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      order: 1,
    }
  ];

  for (const blog of blogData) {
    await prisma.blog.create({ data: blog });
  }

  console.log("✅ Data Sync Completed. Portfolio is now LIVE with high-fidelity blogs and projects.");
}

main()
  .catch((e) => {
    console.error("❌ Sync Failure:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
