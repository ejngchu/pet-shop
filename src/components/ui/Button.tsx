"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * Button component variants
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

/**
 * Button component sizes
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Props for Button component
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether to show a loading spinner */
  loading?: boolean;
  /** Optional icon to display before the text */
  icon?: ReactNode;
  /** Optional spinner component to show when loading */
  spinner?: ReactNode;
}

/** Spinner component for loading state */
function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/** Get variant classes based on button variant */
function getVariantClasses(variant: ButtonVariant, disabled: boolean): string {
  const baseDisabled = "opacity-50 cursor-not-allowed";

  if (disabled) return baseDisabled;

  switch (variant) {
    case "primary":
      return "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-button hover:shadow-pet-hover";
    case "secondary":
      return "bg-brown-500 text-white hover:bg-brown-600 active:bg-brown-700 shadow-pet hover:shadow-pet-hover";
    case "ghost":
      return "bg-transparent text-brown-500 hover:bg-brown-50 active:bg-brown-100";
    case "danger":
      return "bg-red-500 text-white hover:bg-red-600 active:bg-red-700";
    default:
      return "";
  }
}

/** Get size classes based on button size */
function getSizeClasses(size: ButtonSize): string {
  switch (size) {
    case "sm":
      return "px-3 py-1.5 text-sm";
    case "md":
      return "px-4 py-2 text-base";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "";
  }
}

/**
 * A versatile button component with multiple variants, sizes, and loading state.
 * Supports forwardRef for ref handling.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" loading>Submit</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    icon,
    spinner,
    className = "",
    children,
    ...props
  },
  ref
) {
  const variantClasses = getVariantClasses(variant, disabled || loading);
  const sizeClasses = getSizeClasses(size);

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {loading && (spinner || <Spinner className="w-4 h-4" />)}
      {!loading && icon}
      {children}
    </button>
  );
});

Button.displayName = "Button";