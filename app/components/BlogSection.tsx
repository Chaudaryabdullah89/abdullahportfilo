import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ScrambleText from "./ScrambleText";

const BlogSection = async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take: 3, // Only show latest 3 on homepage
  });

  return (
    <section id="blogs" className="w-full bg-white py-24 px-12 font-[family-name:var(--font-space-grotesk)]">
      <div className="max-w-[1200px] mx-auto">

        
        {/* Title Box */}
        <div className="text-center mb-24" data-reveal="fade-up">
          <div className="inline-block border-[5px] border-black px-12 py-3">
            <h2 className="text-3xl font-bold tracking-[0.2em] uppercase">
              <ScrambleText text="The Blog" />
            </h2>
          </div>
        </div>


        {/* Blogs List */}
        <div data-reveal="stagger" className="space-y-4">
          {blogs.map((blog) => (

            <Link 
              href={`/blogs/${blog.id}`} 
              key={blog.id} 
              className="flex flex-col md:flex-row md:items-center justify-between py-10 group transition-all hover:bg-black/5 px-6"
            >
              <div className="flex-1">
                <p className="text-[#4ec9b0] text-[10px] font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-jetbrains-mono)] mb-2">
                  // {blog.category}
                </p>
                <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                  {blog.title}
                </h3>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-8">
                <p className="text-gray-400 text-sm font-bold font-[family-name:var(--font-jetbrains-mono)] uppercase">
                  {blog.date}
                </p>
                <div className="bg-black text-white px-6 py-2 text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Read More
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-16 text-center" data-reveal="fade-up">
          <Link 
            href="/blogs"
            className="text-sm font-bold uppercase tracking-[0.4em] border-b-2 border-black pb-1 hover:tracking-[0.6em] transition-all duration-300"
          >
            See All Posts
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
