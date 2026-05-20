'use client';

import { useState, type FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
 * LoginForm - Client component that handles login with search params
 */
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Validate the form fields
   */
  function validateForm(): boolean {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = "Password too short";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /**
   * Handle form submission
   */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const success = await useAuthStore.getState().login(email, password);

      if (success) {
        const redirect = searchParams.get("redirect") || "/pets";
        router.push(redirect);
      } else {
        setErrors({ email: "Invalid credentials" });
      }
    } catch {
      setErrors({ email: "An error occurred during login" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card padding="lg" className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-brown-600 mb-2">
          PetShop
        </h1>
        <h2 className="text-xl font-semibold text-gray-900">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Log in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          error={errors.email}
          autoComplete="email"
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            error={errors.password}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500 focus:ring-2"
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 text-sm text-gray-600"
          >
            Remember me for 30 days
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-400">
              or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="ghost"
            size="md"
            disabled
            className="w-full"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="md"
            disabled
            className="w-full"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.637H7.079v-3.471h3.047V9.797c0-3.012 1.791-4.674 4.533-4.674 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.931-1.956 1.891v2.25h3.328l-.532 3.469h-2.796v8.734C19.612 23.027 24 18.062 24 12.073z"
                fill="#1877F2"
              />
            </svg>
            Facebook
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="text-brand-500 hover:text-brand-600 font-medium transition-colors"
        >
          Register
        </a>
      </p>
    </Card>
  );
}

/**
 * LoginPage - Wraps LoginForm in Suspense for useSearchParams
 */
export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Suspense fallback={
        <Card padding="lg" className="w-full max-w-md">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6" />
            <div className="space-y-3">
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
            <div className="h-12 bg-gray-200 rounded mt-6" />
          </div>
        </Card>
      }>
        <LoginForm />
      </Suspense>
    </motion.div>
  );
}
