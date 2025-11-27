import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Utensils, Users } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "blog",
    action: "New Blog Posted",
    description: "Healthy Meal Prep for Busy Professionals",
    timestamp: "2 hours ago",
    icon: FileText,
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-700 dark:text-blue-200",
  },
  {
    id: 2,
    type: "plan",
    action: "New Plan Created",
    description: "Muscle Gain - 12 Week Program",
    timestamp: "4 hours ago",
    icon: Utensils,
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-700 dark:text-green-200",
  },
  {
    id: 3,
    type: "request",
    action: "Patient Request",
    description: "Custom diabetes management plan requested",
    timestamp: "6 hours ago",
    icon: Users,
    color: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-700 dark:text-orange-200",
  },
  {
    id: 4,
    type: "blog",
    action: "Blog Updated",
    description: "Superfoods for Cancer Recovery",
    timestamp: "1 day ago",
    icon: FileText,
    color: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-700 dark:text-purple-200",
  },
  {
    id: 5,
    type: "plan",
    action: "Plan Archived",
    description: "Weight Loss Challenge - Summer 2024",
    timestamp: "2 days ago",
    icon: Utensils,
    color: "bg-gray-100 dark:bg-gray-800",
    textColor: "text-gray-700 dark:text-gray-300",
  },
]

export function ActivityFeed() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions and updates in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className={`${activity.color} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${activity.textColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{activity.action}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {activity.timestamp}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/70">{activity.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
