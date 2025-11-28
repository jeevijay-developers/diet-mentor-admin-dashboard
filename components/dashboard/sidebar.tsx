"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  Utensils,
  Users,
  ItalicIcon as AnalyticsIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const navItems = [
  {
    label: "Dashboard Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Blog Management",
    href: "/dashboard/blogs",
    icon: FileText,
  },
  {
    label: "Plan Management",
    href: "/dashboard/plans",
    icon: Utensils,
  },
  {
    label: "Category Management",
    href: "/dashboard/category",
    icon: BarChart3,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("rememberMe");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background border-border"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-80 bg-primary text-primary-foreground shadow-lg transform transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b-2 rounded-md border-gray-200">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div>
                <Image
                  src="/dietmentor-logo.png"
                  alt="DietMentor Logo"
                  width={100}
                  height={80}
                  className="object-contain w-56"
                />
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 my-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-gray-300 text-green-800 "
                        : "text-sidebar-foreground hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="font-medium flex-1">{item.label}</span>
                    {active && <ChevronRight className="h-4 w-4" />}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 bg-white text-primary hover:bg-white/90"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
