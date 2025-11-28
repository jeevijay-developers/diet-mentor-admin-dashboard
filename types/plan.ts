export interface Plan {
  id: string;
  title: string;
  features: string[];
  duration: "weekly" | "monthly" | "custom";
  customDuration?: string;
  pricing: number;
  category?: string;
}
