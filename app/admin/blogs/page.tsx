"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Calendar, RefreshCw, FileText } from "lucide-react";
import { getBlogs, deleteBlog } from "./actions";
import BlogModal from "./BlogModal";
import { toast } from "sonner";
import ConfirmModal from "../components/ConfirmModal";


export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const [searchTerm, setSearchTerm] = useState("");
  
  // Confirmation Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);


  const refreshBlogs = async () => {
    setLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      toast.error("Error: Could not load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshBlogs();
  }, []);

  const handleDeleteTrigger = (id: string) => {
    setBlogToDelete(id);
    setIsConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!blogToDelete) return;
    
    const result = await deleteBlog(blogToDelete);
    if (result.success) {
      toast.success("Post deleted successfully");
      refreshBlogs();
    } else {
      toast.error("Error: Failed to delete post");
    }
    setBlogToDelete(null);
  };


  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={onConfirmDelete}
        title="Delete Post"
        message="Are you sure you want to remove this article? This action cannot be undone."
        confirmLabel="Delete"
      />

      <BlogModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          refreshBlogs();
        }} 
        blog={editingBlog}
      />

      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Blog Posts</h1>
           <p className="text-sm text-gray-500 mt-1">Write and manage your articles and technical insights.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm"
        >
           <Plus size={18} />
           Write Post
        </button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-10 gap-4">
        <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-3 rounded-xl border border-gray-50 w-full md:w-96 group focus-within:border-gray-200 transition-all">
           <Search size={16} className="text-gray-400" />
           <input 
             type="text" 
             placeholder="Search articles..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-gray-300"
           />
        </div>
        <div className="text-sm font-medium text-gray-400">
           Total Posts: <span className="text-black font-bold ml-1">{filteredBlogs.length}</span>
        </div>
      </div>

      {/* Blogs List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 opacity-20">
           <RefreshCw className="animate-spin text-black" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col justify-between hover:border-black/10 hover:shadow-sm transition-all group">
               <div>
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-50 text-gray-500 px-2 py-1 rounded-md">
                       {blog.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase flex items-center gap-1">
                       <Calendar size={12} /> {blog.date}
                    </span>
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 leading-snug mb-6 group-hover:text-black">
                   {blog.title}
                 </h3>
               </div>

               <div className="flex gap-2 pt-6 border-t border-gray-50">
                 <button 
                   onClick={() => handleEdit(blog)}
                   className="flex-1 bg-gray-50 text-black text-xs font-bold py-3 rounded-xl hover:bg-black hover:text-white transition-all text-center"
                 >
                    Edit Post
                 </button>
                 <button 
                   onClick={() => handleDeleteTrigger(blog.id)}
                   className="px-4 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
                 >
                    <Trash2 size={16} />
                 </button>
               </div>
            </div>
          ))}

          {!loading && filteredBlogs.length === 0 && (
            <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
               <p className="text-sm font-medium text-gray-400">No blog posts found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
