"use client";

import { useState, useMemo, useEffect } from "react";
import { PlanList } from "@/components/plans/plan-list";
import { PlanModal } from "@/components/plans/plan-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  getDietPlans,
  createDietPlan,
  updateDietPlan,
  deleteDietPlan,
  getCategories,
} from "@/util/server";
import { Plan } from "@/types/plan";
import { Category } from "@/types/category";

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPlansAndCategories = async () => {
    setLoading(true);
    try {
      const [plansRes, categoriesRes] = await Promise.all([
        getDietPlans(),
        getCategories(),
      ]);
      setPlans(plansRes.data.map((plan: any) => ({ ...plan, id: plan._id })));
      setCategories(
        categoriesRes.data.map((cat: any) => ({ ...cat, id: cat._id }))
      );
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlansAndCategories();
  }, []);

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch = plan.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterCategory === "All" || plan.category === filterCategory;
      return matchesSearch && matchesFilter;
    });
  }, [plans, searchTerm, filterCategory]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddPlan = async (planData: Omit<Plan, "id">) => {
    const fixedPlanData = {
      ...planData,
      duration: planData.duration as "weekly" | "monthly" | "custom",
    };
    try {
      if (editingPlan) {
        await updateDietPlan(editingPlan.id, fixedPlanData);
      } else {
        await createDietPlan(fixedPlanData);
      }
      fetchPlansAndCategories();
    } catch (error) {
      console.error("Failed to save plan:", error);
    }
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = async (id: string) => {
    try {
      await deleteDietPlan(id);
      fetchPlansAndCategories();
    } catch (error) {
      console.error("Failed to delete plan:", error);
    }
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Plan Management
          </h1>
          <p className="text-foreground/60 mt-1">
            Create and manage diet plans for different categories
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingPlan(null);
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
          <Input
            placeholder="Search plans by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-background border-border"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 bg-background border border-border rounded-lg text-foreground"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <PlanList
        plans={paginatedPlans}
        onEdit={handleEditPlan}
        onDelete={handleDeletePlan}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        loading={loading}
        categories={categories}
      />

      <PlanModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPlan(null);
        }}
        onSubmit={handleAddPlan}
        initialPlan={editingPlan}
        categories={categories}
      />
    </div>
  );
}
