"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { getCategories } from "@/util/server";

import { Plan } from "@/types/plan";

import { Category } from "@/types/category";

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (plan: Omit<Plan, "id">) => void | Promise<void>;
  initialPlan?: Plan | null;
  categories: Category[];
}

const durations = ["weekly", "monthly", "custom"];

export function PlanModal({
  isOpen,
  onClose,
  onSubmit,
  initialPlan,
  categories,
}: PlanModalProps) {
  const [title, setTitle] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [duration, setDuration] = useState("");
  const [customDuration, setCustomDuration] = useState("");
  const [pricing, setPricing] = useState("");
  const [category, setCategory] = useState("");
  // categories are now passed as prop

  useEffect(() => {
    if (initialPlan) {
      setTitle(initialPlan.title);
      setFeatures(initialPlan.features || []);
      setDuration(initialPlan.duration);
      setCustomDuration(initialPlan.customDuration || "");
      setPricing(initialPlan.pricing.toString());
      setCategory(initialPlan.category || "");
    } else {
      setTitle("");
      setFeatures([]);
      setDuration("");
      setCustomDuration("");
      setPricing("");
      setCategory("");
    }
  }, [initialPlan, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      features,
      duration: duration as "weekly" | "monthly" | "custom",
      customDuration: duration === "custom" ? customDuration : undefined,
      pricing: Number.parseFloat(pricing),
      category: category || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-0 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h2 className="text-xl font-bold text-foreground">
            {initialPlan ? "Edit Plan" : "Create New Plan"}
          </h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Plan Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter plan title"
              className="mt-1 bg-background border-border"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Features
            </label>
            <div className="flex gap-2 mt-1">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add feature"
                className="bg-background border-border"
              />
              <Button
                type="button"
                onClick={() => {
                  if (featureInput.trim()) {
                    setFeatures([...features, featureInput.trim()]);
                    setFeatureInput("");
                  }
                }}
                className="bg-primary text-primary-foreground"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-muted rounded text-xs flex items-center gap-1"
                >
                  {feat}
                  <button
                    type="button"
                    onClick={() =>
                      setFeatures(features.filter((_, i) => i !== idx))
                    }
                    className="ml-1 text-foreground/60 hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Duration
              </label>
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
            {duration === "custom" && (
              <div>
                <label className="text-sm font-medium text-foreground">
                  Custom Duration
                </label>
                <Input
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  placeholder="Enter custom duration"
                  className="mt-1 bg-background border-border"
                  required={duration === "custom"}
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground">
                Price (INR)
              </label>
              <Input
                type="number"
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
                placeholder="0.00"
                className="mt-1 bg-background border-border"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-border bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {initialPlan ? "Update Plan" : "Create Plan"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
