"use client"

import { useState, useMemo } from "react"
import { PlanList } from "@/components/plans/plan-list"
import { PlanModal } from "@/components/plans/plan-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

interface Plan {
  id: string
  name: string
  targetGroup: string
  ageRange?: string
  medicalCondition?: string
  duration: string
  price: number
  status: "Active" | "Inactive"
  dailyMealStructure: string
  nutritionalBreakdown: string
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Kids Nutrition Essentials (6-12)",
      targetGroup: "Kids",
      ageRange: "6-12",
      duration: "30 days",
      price: 49,
      status: "Active",
      dailyMealStructure: "Breakfast, Snack, Lunch, Snack, Dinner",
      nutritionalBreakdown: "Balanced macronutrients with focus on growth",
    },
    {
      id: "2",
      name: "Cancer Recovery Support",
      targetGroup: "Cancer Patients",
      medicalCondition: "Cancer Recovery",
      duration: "90 days",
      price: 199,
      status: "Active",
      dailyMealStructure: "Gentle meals designed for recovery",
      nutritionalBreakdown: "High protein, antioxidant-rich foods",
    },
    {
      id: "3",
      name: "Weight Loss Transformation",
      targetGroup: "Weight Loss",
      duration: "12 weeks",
      price: 79,
      status: "Active",
      dailyMealStructure: "Caloric deficit with nutrient density",
      nutritionalBreakdown: "1500-1800 cal, 40% protein, 30% fat, 30% carbs",
    },
    {
      id: "4",
      name: "Muscle Gain Program",
      targetGroup: "Muscle Gain",
      duration: "12 weeks",
      price: 89,
      status: "Active",
      dailyMealStructure: "Caloric surplus with protein emphasis",
      nutritionalBreakdown: "2500-3000 cal, 35% protein, 25% fat, 40% carbs",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGroup, setFilterGroup] = useState("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.targetGroup.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterGroup === "All" || plan.targetGroup === filterGroup
      return matchesSearch && matchesFilter
    })
  }, [plans, searchTerm, filterGroup])

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage)
  const paginatedPlans = filteredPlans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAddPlan = (plan: Omit<Plan, "id">) => {
    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === editingPlan.id ? { ...plan, id: p.id } : p)))
    } else {
      setPlans([...plans, { ...plan, id: Date.now().toString() }])
    }
    setIsModalOpen(false)
    setEditingPlan(null)
    setCurrentPage(1)
  }

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id))
  }

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan)
    setIsModalOpen(true)
  }

  const targetGroups = ["All", ...new Set(plans.map((p) => p.targetGroup))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Plan Management</h1>
          <p className="text-foreground/60 mt-1">Create and manage diet plans for different categories</p>
        </div>
        <Button
          onClick={() => {
            setEditingPlan(null)
            setIsModalOpen(true)
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
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 bg-background border-border"
          />
        </div>
        <select
          value={filterGroup}
          onChange={(e) => {
            setFilterGroup(e.target.value)
            setCurrentPage(1)
          }}
          className="px-4 py-2 bg-background border border-border rounded-lg text-foreground"
        >
          {targetGroups.map((group) => (
            <option key={group} value={group}>
              {group}
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
      />

      <PlanModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingPlan(null)
        }}
        onSubmit={handleAddPlan}
        initialPlan={editingPlan}
      />
    </div>
  )
}
