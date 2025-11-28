"use client";

import { useEffect, useState } from "react";

import { StatCard } from "@/components/dashboard/stat-card";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { getBlogs, getDietPlans, getCategories } from "@/util/server";
import { BarChart3, FileText, Utensils } from "lucide-react";

type CategorySlice = {
  name: string;
  value: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState({
    blogs: "--",
    plans: "--",
    categories: "--",
  });
  const [categoryChartData, setCategoryChartData] = useState<CategorySlice[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        const [blogsRes, plansRes, categoriesRes] = await Promise.all([
          getBlogs(),
          getDietPlans(),
          getCategories(),
        ]);

        if (!isMounted) return;

        const blogs = blogsRes?.data ?? [];
        const plans = plansRes?.data ?? [];
        const categories = categoriesRes?.data ?? [];

        setStats({
          blogs: blogs.length.toString(),
          plans: plans.length.toString(),
          categories: categories.length.toString(),
        });

        const categoryMap = new Map<string, string>();
        categories.forEach((category: any) => {
          const key = category?._id ?? category?.id;
          if (typeof key === "string" && key.length) {
            categoryMap.set(key, category.name);
          }
        });

        const distribution = new Map<string, number>();

        plans.forEach((plan: any) => {
          const rawCategory = plan.category;
          const categoryId =
            typeof rawCategory === "object" && rawCategory !== null
              ? rawCategory._id ?? rawCategory.id
              : rawCategory;
          const mapLabel =
            typeof categoryId === "string"
              ? categoryMap.get(categoryId)
              : undefined;
          const label = mapLabel ?? "Unassigned";
          const nextValue = (distribution.get(label) || 0) + 1;
          distribution.set(label, nextValue);
        });

        const chartSlices: CategorySlice[] = Array.from(distribution.entries())
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);

        setCategoryChartData(chartSlices);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-foreground/60">
          Welcome back! Here's your clinic performance at a glance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Blogs"
          value={stats.blogs}
          icon={FileText}
          color="bg-blue-50 dark:bg-blue-950"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Active Plans"
          value={stats.plans}
          icon={Utensils}
          color="bg-green-50 dark:bg-green-950"
          iconColor="text-green-600 dark:text-green-400"
        />
        <StatCard
          title="Categories"
          value={stats.categories}
          icon={BarChart3}
          color="bg-purple-50 dark:bg-purple-950"
          iconColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Category Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <CategoryChart data={categoryChartData} isLoading={isLoading} />
      </div>
    </div>
  );
}
