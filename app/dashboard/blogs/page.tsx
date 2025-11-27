"use client"

import { useState, useMemo } from "react"
import { BlogList } from "@/components/blogs/blog-list"
import { BlogModal } from "@/components/blogs/blog-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

interface Blog {
  id: string
  title: string
  category: string
  author: string
  status: "Published" | "Draft"
  createdDate: string
  excerpt: string
  content: string
  tags: string[]
  metaDescription: string
  image?: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Healthy Meal Prep for Busy Professionals",
      category: "General Health",
      author: "Dr. Sarah Johnson",
      status: "Published",
      createdDate: "2024-11-20",
      excerpt: "Learn how to prepare nutritious meals in advance for a healthier lifestyle.",
      content: "Full blog content here...",
      tags: ["meal-prep", "healthy-eating", "time-saving"],
      metaDescription: "Tips for meal prepping healthy meals as a busy professional.",
      image: "/healthy-meal-prep.png",
    },
    {
      id: "2",
      title: "Cancer Recovery: Nutrition Essentials",
      category: "Cancer",
      author: "Dr. Michael Chen",
      status: "Published",
      createdDate: "2024-11-18",
      excerpt: "Essential nutrients needed during cancer recovery and treatment.",
      content: "Full blog content here...",
      tags: ["cancer-recovery", "nutrition", "treatment"],
      metaDescription: "Nutritional guidance for cancer patients during recovery.",
      image: "/cancer-recovery-nutrition.jpg",
    },
    {
      id: "3",
      title: "Pediatric Nutrition: Ages 6-12",
      category: "Kids",
      author: "Dr. Emily Rodriguez",
      status: "Draft",
      createdDate: "2024-11-19",
      excerpt: "Nutritional requirements and healthy habits for children.",
      content: "Full blog content here...",
      tags: ["kids-nutrition", "parenting", "growth"],
      metaDescription: "Guide to proper nutrition for children aged 6-12.",
      image: "/kids-nutrition.jpg",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBlogs = useMemo(() => {
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [blogs, searchTerm])

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAddBlog = (blog: Omit<Blog, "id">) => {
    if (editingBlog) {
      setBlogs(blogs.map((b) => (b.id === editingBlog.id ? { ...blog, id: b.id } : b)))
    } else {
      setBlogs([...blogs, { ...blog, id: Date.now().toString() }])
    }
    setIsModalOpen(false)
    setEditingBlog(null)
    setCurrentPage(1)
  }

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter((b) => b.id !== id))
  }

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
          <p className="text-foreground/60 mt-1">Create, edit, and manage clinic blogs</p>
        </div>
        <Button
          onClick={() => {
            setEditingBlog(null)
            setIsModalOpen(true)
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
            setSearchTerm(e.target.value)
            setCurrentPage(1)
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
          setIsModalOpen(false)
          setEditingBlog(null)
        }}
        onSubmit={handleAddBlog}
        initialBlog={editingBlog}
      />
    </div>
  )
}
