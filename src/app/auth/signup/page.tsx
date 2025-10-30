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
import { ValidationMessage, PasswordRequirements } from "@/components/forms/ValidationMessage";

const signupSchema = z
  .object({
    displayName: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address (e.g., you@example.com)"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please ensure both passwords are identical.",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter (a-z)", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number (0-9)", test: (p: string) => /[0-9]/.test(p) },
];

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const password = watch("password", "");

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError("");
      setSuccessMessage("");
      await signup(data.email, data.password, data.displayName);
      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 500);
    } catch (err) {
      // Provide more specific error messages
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during signup. Please try again or contact support if the problem persists.";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Start your learning journey today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="displayName">
                Full Name <span className="text-destructive" aria-label="required">*</span>
              </Label>
              <Input
                id="displayName"
                type="text"
                placeholder="John Doe"
                aria-required="true"
                aria-invalid={errors.displayName ? "true" : "false"}
                aria-describedby={errors.displayName ? "displayName-error" : undefined}
                {...register("displayName")}
              />
              {errors.displayName && (
                <ValidationMessage
                  id="displayName-error"
                  message={errors.displayName.message || "Invalid name"}
                  type="error"
                />
              )}
            </div>

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
              <Label htmlFor="password">
                Password <span className="text-destructive" aria-label="required">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                aria-required="true"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error password-requirements" : "password-requirements"}
                {...register("password")}
              />
              {errors.password && (
                <ValidationMessage
                  id="password-error"
                  message={errors.password.message || "Invalid password"}
                  type="error"
                />
              )}
              <PasswordRequirements
                password={password}
                requirements={passwordRequirements}
                className="mt-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password <span className="text-destructive" aria-label="required">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                aria-required="true"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <ValidationMessage
                  id="confirmPassword-error"
                  message={errors.confirmPassword.message || "Passwords do not match"}
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
              {isLoading || isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              href="/auth/login"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
