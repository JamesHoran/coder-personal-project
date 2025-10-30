"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { ValidationMessage } from "@/components/forms/ValidationMessage";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address (e.g., you@example.com)"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      setSuccessMessage("");
      await login(data.email, data.password);
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 500);
    } catch (err) {
      // Provide more specific error messages
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Invalid email or password. Please check your credentials and try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue learning</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive" aria-label="required">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <ValidationMessage
                  id="email-error"
                  message={errors.email.message || "Invalid email"}
                  type="error"
                />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Password <span className="text-destructive" aria-label="required">*</span>
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label="Forgot your password? Click here to reset it"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                aria-required="true"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password")}
              />
              {errors.password && (
                <ValidationMessage
                  id="password-error"
                  message={errors.password.message || "Invalid password"}
                  type="error"
                />
              )}
            </div>

            {error && (
              <ValidationMessage
                message={error}
                type="error"
                className="p-3 rounded-md bg-destructive/10"
              />
            )}

            {successMessage && (
              <ValidationMessage
                message={successMessage}
                type="success"
                className="p-3 rounded-md bg-green-50 dark:bg-green-950"
              />
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isSubmitting}
              aria-busy={isLoading || isSubmitting}
            >
              {isLoading || isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link
              href="/auth/signup"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
