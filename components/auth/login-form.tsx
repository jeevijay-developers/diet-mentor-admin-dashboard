"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, "");
const HEALTH_CHECK_URL = `${API_BASE_URL}/health-check`;

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const waitForBackend = async () => {
  // Keep pinging the backend health-check until it responds with 200.
  // Some hosting providers pause inactive servers, so we loop until it's awake.
  let hasLoggedFailure = false;

  while (true) {
    try {
      const response = await fetch(HEALTH_CHECK_URL, {
        cache: "no-store",
      });

      if (response.ok) {
        return;
      }
    } catch (error) {
      if (!hasLoggedFailure) {
        console.info(
          "Backend health-check failed, retrying until it wakes up...",
          error
        );
        hasLoggedFailure = true;
      }
    }

    await sleep(1500);
  }
};

const VALID_CREDENTIALS = {
  email: "admin@dietmentor.com",
  password: "DietMentor@123",
};

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Signing in...");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage("Signing in...");

    try {
      await sleep(600);

      if (
        email !== VALID_CREDENTIALS.email ||
        password !== VALID_CREDENTIALS.password
      ) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem("auth", "true");
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      setLoadingMessage("Waking backend...");
      await waitForBackend();

      toast({
        title: "Login Successful",
        description: "Welcome back to DietMentor!",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Server Unavailable",
        description: "We couldn't wake the backend. Please try again shortly.",
        variant: "destructive",
      });
      console.error("Failed to wake backend", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-secondary via-background to-secondary p-4">
      <div className="w-full max-w-md">
        {!showForgotPassword ? (
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-2 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
                  DM
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">DietMentor</CardTitle>
              <CardDescription className="text-sm text-foreground/70">
                Guiding Health Through Smart Nutrition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@dietmentor.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={() => setRememberMe(!rememberMe)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-foreground/70 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? loadingMessage : "Sign In"}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-xl">Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your
                password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                placeholder="admin@dietmentor.com"
                className="bg-background border-border"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Send Reset Link
              </Button>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="w-full text-sm text-foreground/70 hover:underline"
              >
                Back to Login
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
