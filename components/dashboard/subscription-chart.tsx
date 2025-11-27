"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", subscriptions: 40, activeUsers: 24 },
  { month: "Feb", subscriptions: 55, activeUsers: 32 },
  { month: "Mar", subscriptions: 72, activeUsers: 48 },
  { month: "Apr", subscriptions: 95, activeUsers: 61 },
  { month: "May", subscriptions: 128, activeUsers: 85 },
  { month: "Jun", subscriptions: 156, activeUsers: 110 },
]

export function SubscriptionChart() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Plan Subscriptions</CardTitle>
        <CardDescription>Monthly subscription trends over the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
            <YAxis stroke="currentColor" opacity={0.5} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-background))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--color-foreground))" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="subscriptions"
              stroke="hsl(var(--color-primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--color-primary))" }}
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="hsl(var(--color-accent))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--color-accent))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
