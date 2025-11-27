"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

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

interface PlanModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (plan: Omit<Plan, "id">) => void
  initialPlan?: Plan | null
}

const targetGroups = [
  "Kids",
  "Cancer Patients",
  "Weight Loss",
  "Muscle Gain",
  "Diabetes",
  "PCOS",
  "Heart-friendly",
  "Custom",
]
const ageRanges = ["0-5", "6-12", "13-18"]
const medicalConditions = [
  "Cancer Recovery",
  "Type 1 Diabetes",
  "Type 2 Diabetes",
  "PCOS",
  "Heart Disease",
  "Hypertension",
  "Other",
]
const durations = ["7 days", "14 days", "30 days", "60 days", "90 days", "6 months"]

export function PlanModal({ isOpen, onClose, onSubmit, initialPlan }: PlanModalProps) {
  const [name, setName] = useState("")
  const [targetGroup, setTargetGroup] = useState("")
  const [ageRange, setAgeRange] = useState("")
  const [medicalCondition, setMedicalCondition] = useState("")
  const [duration, setDuration] = useState("")
  const [price, setPrice] = useState("")
  const [dailyMealStructure, setDailyMealStructure] = useState("")
  const [nutritionalBreakdown, setNutritionalBreakdown] = useState("")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (initialPlan) {
      setName(initialPlan.name)
      setTargetGroup(initialPlan.targetGroup)
      setAgeRange(initialPlan.ageRange || "")
      setMedicalCondition(initialPlan.medicalCondition || "")
      setDuration(initialPlan.duration)
      setPrice(initialPlan.price.toString())
      setDailyMealStructure(initialPlan.dailyMealStructure)
      setNutritionalBreakdown(initialPlan.nutritionalBreakdown)
      setIsActive(initialPlan.status === "Active")
    } else {
      setName("")
      setTargetGroup("")
      setAgeRange("")
      setMedicalCondition("")
      setDuration("")
      setPrice("")
      setDailyMealStructure("")
      setNutritionalBreakdown("")
      setIsActive(true)
    }
  }, [initialPlan, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      targetGroup,
      ageRange: ageRange || undefined,
      medicalCondition: medicalCondition || undefined,
      duration,
      price: Number.parseFloat(price),
      status: isActive ? "Active" : "Inactive",
      dailyMealStructure,
      nutritionalBreakdown,
    })
  }

  if (!isOpen) return null

  const showAgeRange = targetGroup === "Kids"
  const showMedicalCondition = ["Cancer Patients", "Diabetes", "PCOS", "Heart-friendly", "Custom"].includes(targetGroup)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-0 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h2 className="text-xl font-bold text-foreground">{initialPlan ? "Edit Plan" : "Create New Plan"}</h2>
          <button onClick={onClose} className="text-foreground/60 hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Plan Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter plan name"
              className="mt-1 bg-background border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Target Category</label>
            <select
              value={targetGroup}
              onChange={(e) => setTargetGroup(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              required
            >
              <option value="">Select category</option>
              {targetGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {showAgeRange && (
            <div>
              <label className="text-sm font-medium text-foreground">Age Range</label>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              >
                <option value="">Select age range</option>
                {ageRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showMedicalCondition && (
            <div>
              <label className="text-sm font-medium text-foreground">Medical Condition</label>
              <select
                value={medicalCondition}
                onChange={(e) => setMedicalCondition(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              >
                <option value="">Select condition</option>
                {medicalConditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
                required
              >
                <option value="">Select duration</option>
                {durations.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Price ($)</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="mt-1 bg-background border-border"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Daily Meal Structure</label>
            <textarea
              value={dailyMealStructure}
              onChange={(e) => setDailyMealStructure(e.target.value)}
              placeholder="e.g., Breakfast, Snack, Lunch, Snack, Dinner"
              className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Nutritional Breakdown</label>
            <textarea
              value={nutritionalBreakdown}
              onChange={(e) => setNutritionalBreakdown(e.target.value)}
              placeholder="e.g., 40% protein, 30% fat, 30% carbs"
              className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
              rows={2}
              required
            />
          </div>

          <div className="flex items-center gap-2 pt-4">
            <Checkbox id="active" checked={isActive} onCheckedChange={() => setIsActive(!isActive)} />
            <label htmlFor="active" className="text-sm font-medium text-foreground cursor-pointer">
              Mark as active
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <Button variant="outline" onClick={onClose} className="border-border bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {initialPlan ? "Update Plan" : "Create Plan"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
