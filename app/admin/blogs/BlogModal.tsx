"use client";

import React, { useState, useEffect } from "react";
import { X, Save, FileText, Type, Hash, Calendar, User, AlignLeft, Image as ImageIcon, Clock, Tags } from "lucide-react";
import { toast } from "sonner";
import { createBlog, updateBlog } from "./actions";

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog?: any;
}

export default function BlogModal({ isOpen, onClose, blog }: BlogModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    image: "",
    tags: "",
    readTime: "5 min read",
    author: "Muhammad Abdullah",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        category: blog.category || "",
        summary: blog.summary || "",
        content: blog.content || "",
        image: blog.image || "",
        tags: blog.tags || "",
        readTime: blog.readTime || "5 min read",
        author: blog.author || "Muhammad Abdullah",
        date: blog.date || "",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        summary: "",
        content: "",
        image: "",
        tags: "",
        readTime: "5 min read",
        author: "Muhammad Abdullah",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      });
    }
  }, [blog, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = blog 
        ? await updateBlog(blog.id, formData)
        : await createBlog(formData);

      if (result.success) {
        toast.success(blog ? "Article updated" : "Article published");
        onClose();
      } else {
        toast.error("Error: Could not save article");
      }
    } catch (error) {
      toast.error("Error: Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[850px] rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden border border-gray-100">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 z-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <FileText className="text-black" size={20} />
             </div>
             <div>
                <h3 className="font-bold text-gray-900">
                  {blog ? "Edit Article" : "Write New Article"}
                </h3>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form 
          onSubmit={handleSubmit} 
          className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar outline-none min-h-0"
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Title */}
              <div className="space-y-2 md:col-span-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Article Title</label>
                 <input 
                   required
                   value={formData.title}
                   onChange={e => setFormData({...formData, title: e.target.value})}
                   placeholder="e.g. The Future of Web Development"
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                 />
              </div>

              {/* Featured Image */}
              <div className="space-y-2 md:col-span-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Featured Image URL</label>
                 <div className="flex gap-4">
                    <input 
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    />
                    <label className="cursor-pointer bg-black text-white px-8 py-4 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shrink-0">
                      <ImageIcon size={14} />
                      {loading ? "..." : "Upload"}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          const uploaderData = new FormData();
                          uploaderData.append("file", file);
                          
                          setLoading(true);
                          try {
                            const res = await fetch("/api/upload", { method: "POST", body: uploaderData });
                            const data = await res.json();
                            if (data.url) {
                              setFormData({ ...formData, image: data.url });
                              toast.success("Image uploaded");
                            }
                          } catch (err) {
                            toast.error("Upload failed");
                          } finally {
                            setLoading(false);
                          }
                        }}
                      />
                    </label>
                 </div>
              </div>

              {/* Category & Date */}
              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Category</label>
                 <input 
                   required
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value})}
                   placeholder="e.g. Technology"
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Publication Date</label>
                 <input 
                   required
                   value={formData.date}
                   onChange={e => setFormData({...formData, date: e.target.value})}
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                 />
              </div>

              {/* Read Time & Tags */}
              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Est. Read Time</label>
                 <input 
                   value={formData.readTime}
                   onChange={e => setFormData({...formData, readTime: e.target.value})}
                   placeholder="e.g. 5 min read"
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Tags (Comma separated)</label>
                 <input 
                   value={formData.tags}
                   onChange={e => setFormData({...formData, tags: e.target.value})}
                   placeholder="React, Design, Future"
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                 />
              </div>

              {/* Summary */}
              <div className="space-y-2 md:col-span-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Post Summary</label>
                 <textarea 
                   rows={3}
                   value={formData.summary}
                   onChange={e => setFormData({...formData, summary: e.target.value})}
                   placeholder="A brief overview for the blog cards..."
                   className="w-full bg-gray-50/50 border border-gray-100 p-5 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none leading-relaxed"
                 />
              </div>

              {/* Article Content */}
              <div className="space-y-2 md:col-span-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Article Content (Markdown)</label>
                 <textarea 
                   required
                   rows={15}
                   value={formData.content}
                   onChange={e => setFormData({...formData, content: e.target.value})}
                   placeholder="# Start your story here..."
                   className="w-full bg-gray-50/50 border border-gray-100 p-8 rounded-2xl text-sm font-medium leading-loose focus:border-black focus:ring-1 focus:ring-black transition-all resize-none custom-scrollbar"
                 />
              </div>

              {/* Byline */}
              <div className="space-y-2 md:col-span-2">
                 <label className="text-xs font-semibold text-gray-500 ml-1">Author Name</label>
                 <input 
                   required
                   value={formData.author}
                   onChange={e => setFormData({...formData, author: e.target.value})}
                   className="w-full bg-gray-50/50 border border-gray-100 px-5 py-4 rounded-xl text-sm font-medium outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                 />
              </div>

           </div>

           {/* Submit Section */}
           <div className="pt-8 border-t border-gray-100 flex justify-end gap-4 pb-2">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-3.5 text-sm font-semibold text-gray-400 hover:text-black transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="bg-black text-white px-10 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50"
              >
                <Save size={18} />
                {loading ? "Publishing..." : "Publish Post"}
              </button>
           </div>
        </form>

      </div>
    </div>
  );
}
