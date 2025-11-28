"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Plan } from "@/types/plan";
import { Category } from "@/types/category";

interface PlanListProps {
  plans: Plan[];
  onEdit: (plan: Plan) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  categories?: Category[];
}

interface PlanListProps {
  plans: Plan[];
  onEdit: (plan: Plan) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PlanList({
  plans,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  loading,
  categories,
}: PlanListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function getCategoryName(catId?: string) {
    if (!categories || !catId) return "-";
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.name : "-";
  }

  return (
    <>
      <Card className="border-0 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Plan Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Features
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Custom Duration
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Price (INR)
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-foreground font-medium">
                    {plan.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {plan.features && plan.features.length > 0
                      ? plan.features.join(", ")
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {plan.duration}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {plan.customDuration || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">
                    ₹{plan.pricing}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {getCategoryName(plan.category)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(plan)}
                        className="border-border hover:bg-gray-300 hover:text-green-900"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(plan.id)}
                        className="border-border hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {plans.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-foreground/60">
              No plans found. Create your first plan to get started.
            </p>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground/60">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-border"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-border"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this plan? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) onDelete(deleteId);
                setDeleteId(null);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
