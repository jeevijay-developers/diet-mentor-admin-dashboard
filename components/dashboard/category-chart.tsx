"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type CategorySlice = {
  name: string;
  value: number;
};

const FALLBACK_DATA: CategorySlice[] = [{ name: "General", value: 1 }];

const COLORS = [
  "#6366F1",
  "#F97316",
  "#10B981",
  "#EC4899",
  "#14B8A6",
  "#F59E0B",
  "#3B82F6",
  "#A855F7",
];

interface CategoryChartProps {
  data?: CategorySlice[];
  isLoading?: boolean;
}

export function CategoryChart({ data, isLoading = false }: CategoryChartProps) {
  const hasData = Array.isArray(data) && data.length > 0;
  const chartData = hasData ? data : FALLBACK_DATA;

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Diet Categories</CardTitle>
        <CardDescription>Distribution of active plans</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-foreground/60">
            Loading chart...
          </div>
        ) : hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid hsl(var(--color-border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--color-foreground))" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[300px] items-center justify-center text-sm text-foreground/60">
            No category data available yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}
