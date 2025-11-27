"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

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

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (blog: Omit<Blog, "id">) => void
  initialBlog?: Blog | null
}

const categories = [
  "Kids",
  "Cancer",
  "Weight Loss",
  "Muscle Gain",
  "Diabetes",
  "PCOS",
  "Heart-friendly",
  "General Health",
]

export function BlogModal({ isOpen, onClose, onSubmit, initialBlog }: BlogModalProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [author, setAuthor] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [isPublished, setIsPublished] = useState(false)

  useEffect(() => {
    if (initialBlog) {
      setTitle(initialBlog.title)
      setCategory(initialBlog.category)
      setAuthor(initialBlog.author)
      setExcerpt(initialBlog.excerpt)
      setContent(initialBlog.content)
      setTags(initialBlog.tags.join(", "))
      setMetaDescription(initialBlog.metaDescription)
      setIsPublished(initialBlog.status === "Published")
    } else {
      setTitle("")
      setCategory("")
      setAuthor("")
      setExcerpt("")
      setContent("")
      setTags("")
      setMetaDescription("")
      setIsPublished(false)
    }
  }, [initialBlog, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      category,
      author,
      status: isPublished ? "Published" : "Draft",
      createdDate: initialBlog?.createdDate || new Date().toISOString().split("T")[0],
      excerpt,
      content,
      tags: tags.split(",").map((t) => t.trim()),
      metaDescription,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-0 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h2 className="text-xl font-bold text-foreground">{initialBlog ? "Edit Blog" : "Create New Blog"}</h2>
          <button onClick={onClose} className="text-foreground/60 hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Blog Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="mt-1 bg-background border-border"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Author</label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                className="mt-1 bg-background border-border"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the blog"
              className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Full blog content"
              className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Tags</label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
              className="mt-1 bg-background border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="SEO meta description"
              className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              rows={2}
            />
          </div>

          <div className="flex items-center gap-2 pt-4">
            <Checkbox id="published" checked={isPublished} onCheckedChange={() => setIsPublished(!isPublished)} />
            <label htmlFor="published" className="text-sm font-medium text-foreground cursor-pointer">
              Publish this blog
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <Button variant="outline" onClick={onClose} className="border-border bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {initialBlog ? "Update Blog" : "Create Blog"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
