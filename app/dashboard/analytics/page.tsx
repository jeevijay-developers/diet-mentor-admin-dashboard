"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const chartData1 = [
  { month: "Jan", revenue: 2000, patients: 40 },
  { month: "Feb", revenue: 3000, patients: 55 },
  { month: "Mar", revenue: 4500, patients: 72 },
  { month: "Apr", revenue: 6200, patients: 95 },
  { month: "May", revenue: 8100, patients: 128 },
  { month: "Jun", revenue: 10500, patients: 156 },
]

const chartData2 = [
  { category: "Kids", plans: 28, active: 24 },
  { category: "Cancer", plans: 15, active: 12 },
  { category: "Weight Loss", plans: 32, active: 30 },
  { category: "Muscle Gain", plans: 18, active: 16 },
  { category: "Diabetes", plans: 22, active: 20 },
  { category: "Heart Health", plans: 12, active: 10 },
]

const engagementData = [
  { day: "Mon", visits: 240, engagement: 65 },
  { day: "Tue", visits: 320, engagement: 72 },
  { day: "Wed", visits: 280, engagement: 68 },
  { day: "Thu", visits: 420, engagement: 85 },
  { day: "Fri", visits: 580, engagement: 92 },
  { day: "Sat", visits: 720, engagement: 88 },
  { day: "Sun", visits: 650, engagement: 80 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-foreground/60 mt-1">Detailed insights into your clinic's performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <div className="p-6">
            <p className="text-sm text-foreground/60 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-foreground">$34,300</p>
            <p className="text-xs text-primary mt-2">+12% from last month</p>
          </div>
        </Card>
        <Card className="border-0 shadow-md">
          <div className="p-6">
            <p className="text-sm text-foreground/60 mb-1">Active Patients</p>
            <p className="text-3xl font-bold text-foreground">427</p>
            <p className="text-xs text-primary mt-2">+28% from last month</p>
          </div>
        </Card>
        <Card className="border-0 shadow-md">
          <div className="p-6">
            <p className="text-sm text-foreground/60 mb-1">Plan Completions</p>
            <p className="text-3xl font-bold text-foreground">89</p>
            <p className="text-xs text-primary mt-2">85% success rate</p>
          </div>
        </Card>
        <Card className="border-0 shadow-md">
          <div className="p-6">
            <p className="text-sm text-foreground/60 mb-1">Avg Rating</p>
            <p className="text-3xl font-bold text-foreground">4.8/5</p>
            <p className="text-xs text-primary mt-2">From 324 reviews</p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Revenue & Patients</CardTitle>
            <CardDescription>6-month trend overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData1} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
                  dataKey="revenue"
                  stroke="hsl(var(--color-primary))"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="hsl(var(--color-accent))"
                  strokeWidth={2}
                  name="New Patients"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Plans vs active enrollment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData2} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="category" stroke="currentColor" opacity={0.5} />
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
                <Bar dataKey="plans" fill="hsl(var(--color-primary))" name="Total Plans" />
                <Bar dataKey="active" fill="hsl(var(--color-accent))" name="Active" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
            <CardDescription>Site visits and user engagement rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={engagementData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--color-primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--color-primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="day" stroke="currentColor" opacity={0.5} />
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
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="hsl(var(--color-primary))"
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                  name="Site Visits"
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="hsl(var(--color-accent))"
                  fill="hsl(var(--color-accent))"
                  fillOpacity={0.2}
                  name="Engagement %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
