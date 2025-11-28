"use client";

import type React from "react";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

import { Blog } from "@/types/blog";
import { uploadImage as uploadImageRequest } from "@/util/server";

type BlogFormPayload = Omit<Blog, "id"> & { id?: string };

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (blog: BlogFormPayload) => void;
  initialBlog?: Blog | null;
}

export function BlogModal({
  isOpen,
  onClose,
  onSubmit,
  initialBlog,
}: BlogModalProps) {
  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialBlog) {
      setTitle(initialBlog.title);
      setBannerImage(initialBlog.bannerImage || "");
      setBody(initialBlog.body);
      setDate(initialBlog.date || "");
    } else {
      setTitle("");
      setBannerImage("");
      setBody("");
      setDate("");
    }
  }, [initialBlog, isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);

    try {
      const response = await uploadImageRequest(file, "blogs");
      if (response.data?.url) {
        setBannerImage(response.data.url);
      } else {
        setUploadError("Image uploaded but no URL returned by Cloudinary.");
      }
    } catch (err) {
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialBlog?.id,
      title,
      bannerImage: bannerImage || undefined,
      body,
      date: date || new Date().toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-0 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h2 className="text-xl font-bold text-foreground">
            {initialBlog ? "Edit Blog" : "Create New Blog"}
          </h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Blog Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="mt-1 bg-background border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Banner Image
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 bg-background border-border"
              disabled={uploading}
            />
            {uploading && (
              <span className="text-xs text-foreground/60">Uploading...</span>
            )}
            {uploadError && (
              <span className="block text-xs text-destructive">
                {uploadError}
              </span>
            )}
            {bannerImage && (
              <div className="mt-2">
                <img
                  src={bannerImage}
                  alt="Banner"
                  className="h-20 w-auto rounded"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Blog Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter blog content"
              className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              rows={6}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Date</label>
            <Input
              type="date"
              value={date ? date.split("T")[0] : ""}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 bg-background border-border"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-border bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {initialBlog ? "Update Blog" : "Create Blog"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
