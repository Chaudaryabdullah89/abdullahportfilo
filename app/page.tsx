import { prisma } from "@/lib/prisma";
import HeroHeader from "./components/HeroHeader";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import PortfolioSection from "./components/PortfolioSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export const dynamic = 'force-dynamic';

export default async function Page() {
  console.log(">>> [ADMIN_TELEMETRY]: Initiating Landing Page Data Sync...");
  const start = Date.now();

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" },
  }) || {
    heroName: "Muhammad Abdullah",
    heroTitle: "Full Stack Developer",
    heroBadge: "Available for hire",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    email: "abdullah@example.com"
  };

  console.log(`>>> [ADMIN_TELEMETRY]: Data Sync Completed in ${Date.now() - start}ms`);

  return (
    <main>
      <HeroHeader settings={settings} />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <PortfolioSection />
      <BlogSection />
      <ContactSection />
      <Footer settings={settings} />
    </main>
  );
}






