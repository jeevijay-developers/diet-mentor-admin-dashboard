"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Kids", value: 28 },
  { name: "Cancer", value: 15 },
  { name: "Weight Loss", value: 32 },
  { name: "Muscle Gain", value: 18 },
  { name: "Diabetes", value: 22 },
  { name: "Heart Health", value: 12 },
  { name: "Custom", value: 8 },
]

const COLORS = [
  "hsl(var(--color-chart-1))",
  "hsl(var(--color-chart-2))",
  "hsl(var(--color-chart-3))",
  "hsl(var(--color-chart-4))",
  "hsl(var(--color-chart-5))",
  "hsl(var(--color-accent))",
  "hsl(var(--color-muted))",
]

export function CategoryChart() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Diet Categories</CardTitle>
        <CardDescription>Distribution of active plans</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-background))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--color-foreground))" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
