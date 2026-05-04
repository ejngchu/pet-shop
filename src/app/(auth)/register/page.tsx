"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Minimum password length
 */
const MIN_PASSWORD_LENGTH = 6;

/**
 * Form errors interface
 */
interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

export default function RegisterPage() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Validate the form fields
   * @returns True if form is valid
   */
  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Validate email format
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate password length
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }

    // Validate password match
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Validate terms acceptance
    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /**
   * Handle form submission
   */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create user object from form data
      const user = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      // Mock login - set user directly in store
      useAuthStore.getState().login(email, password);

      // Also set user manually to ensure it has the correct data
      useAuthStore.setState({ user });

      // Redirect to pets page
      router.push("/pets");
    } catch {
      setErrors({ email: "An error occurred during registration" });
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handle input change with error clearing
   */
  function handleInputChange(
    field: keyof FormErrors,
    value: string | boolean
  ) {
    if (field === "name") {
      setName(value as string);
    } else if (field === "email") {
      setEmail(value as string);
    } else if (field === "password") {
      setPassword(value as string);
    } else if (field === "confirmPassword") {
      setConfirmPassword(value as string);
    } else if (field === "agreeTerms") {
      setAgreeTerms(value as boolean);
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card padding="lg" className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* Logo/Brand */}
          <h1 className="text-2xl font-bold text-brown-600 mb-2">
            PetShop
          </h1>
          {/* Create Account heading */}
          <h2 className="text-xl font-semibold text-gray-900">
            Create Account
          </h2>
          {/* Subtitle */}
          <p className="text-sm text-gray-500 mt-1">
            Join PetShop today
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Input */}
          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={errors.name}
            autoComplete="name"
          />

          {/* Email Input */}
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            autoComplete="email"
          />

          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password}
              autoComplete="new-password"
            />
            {/* Show/Hide Password Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
            {/* Show/Hide Confirm Password Toggle */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
              className="w-4 h-4 mt-1 text-brand-500 border-gray-300 rounded focus:ring-brand-500 focus:ring-2"
            />
            <label
              htmlFor="agreeTerms"
              className="ml-2 text-sm text-gray-600"
            >
              I agree to the{" "}
              <a href="#" className="text-brand-500 hover:text-brand-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-brand-500 hover:text-brand-600">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-sm text-red-500 mt-1">{errors.agreeTerms}</p>
          )}

          {/* Register Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-brand-500 hover:text-brand-600 font-medium transition-colors"
          >
            Login
          </a>
        </p>
      </Card>
    </motion.div>
  );
}