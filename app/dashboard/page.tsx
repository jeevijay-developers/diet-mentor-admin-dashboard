"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { BarChart3, FileText, Utensils } from "lucide-react";

export default function DashboardPage() {
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
          value="42" // Replace with dynamic value from API
          icon={FileText}
          color="bg-blue-50 dark:bg-blue-950"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Active Plans"
          value="128" // Replace with dynamic value from API
          icon={Utensils}
          color="bg-green-50 dark:bg-green-950"
          iconColor="text-green-600 dark:text-green-400"
        />
        <StatCard
          title="Categories"
          value="7" // Replace with dynamic value from API
          icon={BarChart3}
          color="bg-purple-50 dark:bg-purple-950"
          iconColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Category Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <CategoryChart />
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}
