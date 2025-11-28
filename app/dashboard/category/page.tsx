"use client";

import { useState, useMemo, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/util/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

// You may want to create CategoryList and CategoryModal components for consistency
// For now, we'll keep everything in this file for clarity

export type Category = {
  id: string;
  name: string;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(
        res.data.map((cat: any) => ({ id: cat._id, name: cat.name }))
      );
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (category: Omit<Category, "id">) => {
    try {
      if (editingCategory) {
        const res = await updateCategory(editingCategory.id, category);
        setCategories(
          categories.map((c) =>
            c.id === editingCategory.id
              ? { id: res.data._id, name: res.data.name }
              : c
          )
        );
      } else {
        const res = await createCategory(category);
        setCategories([
          ...categories,
          { id: res.data._id, name: res.data.name },
        ]);
      }
    } catch (err) {
      // handle error
    }
    setIsModalOpen(false);
    setEditingCategory(null);
    setCurrentPage(1);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      // handle error
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Category Management
          </h1>
          <p className="text-foreground/60 mt-1">
            Create, edit, and manage categories
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Category
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
        <Input
          placeholder="Search categories by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10 bg-background border-border"
        />
      </div>

      {/* Category List */}
      <div className="bg-card rounded-lg shadow p-4 w-fit">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading...
          </div>
        ) : (
          <table>
            <thead>
              <tr className="text-xs text-muted-foreground border-b grid grid-cols-2">
                <th className="py-2 text-start">Name</th>
                <th className="py-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((cat) => (
                <tr
                  key={cat.id}
                  className="max-w-96 grid grid-cols-2 justify-between mx-auto"
                >
                  <td className="py-2 font-medium">{cat.name}</td>
                  <td className="py-2 mx-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="mr-2 hover:bg-gray-300 hover:text-green-900"
                      onClick={() => handleEditCategory(cat)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCategory(cat.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                size="sm"
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? "Edit Category" : "Create Category"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as typeof e.target & {
                  name: { value: string };
                };
                handleAddCategory({ name: form.name.value });
              }}
            >
              <Input
                name="name"
                defaultValue={editingCategory?.name || ""}
                placeholder="Category name"
                className="mb-4"
                required
              />
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="hover:bg-gray-300 hover:text-green-900"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  {editingCategory ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
