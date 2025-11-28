"use client";

import { useState, useMemo, useEffect } from "react";
import { BlogList } from "@/components/blogs/blog-list";
import { BlogModal } from "@/components/blogs/blog-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

// Remove the local Blog interface and import it from a shared location
import { Blog } from "@/types/blog";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/util/server";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await getBlogs();
        setBlogs(
          res.data.map((blog: any) => ({
            id: blog._id,
            title: blog.title,
            body: blog.body,
            bannerImage: blog.bannerImage,
            date: blog.date,
          }))
        );
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogs, searchTerm]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddBlog = async (blog: Blog) => {
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.title, blog); // using title as unique identifier for update
      } else {
        await createBlog(blog);
      }
      // Refresh blogs
      const res = await getBlogs();
      setBlogs(
        res.data.map((blog: any) => ({
          id: blog._id,
          title: blog.title,
          body: blog.body,
          bannerImage: blog.bannerImage,
          date: blog.date,
        }))
      );
    } catch (error) {
      // handle error
    }
    setIsModalOpen(false);
    setEditingBlog(null);
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      // handle error
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Blog Management
          </h1>
          <p className="text-foreground/60 mt-1">
            Create, edit, and manage clinic blogs
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingBlog(null);
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Blog
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
        <Input
          placeholder="Search blogs by title or category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10 bg-background border-border"
        />
      </div>

      <BlogList
        blogs={paginatedBlogs}
        onEdit={handleEditBlog}
        onDelete={handleDeleteBlog}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <BlogModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBlog(null);
        }}
        onSubmit={handleAddBlog}
        initialBlog={editingBlog}
      />
    </div>
  );
}
