"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

/** Input type variants */
export type InputType = "text" | "email" | "password" | "number";

/** Props for Input component */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** The input type */
  type?: InputType;
  /** Label displayed above the input */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Icon to display inside the input (left side) */
  icon?: ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Optional helper text displayed below the input */
  helperText?: string;
}

/**
 * Input component with label, error state, icon support, and validation.
 * Uses forwardRef for ref handling.
 * 
 * @example
 * ```tsx
 * <Input label="Email" type="email" required error="Invalid email" icon={<MailIcon />} />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = "text",
    label,
    error,
    icon,
    required = false,
    helperText,
    className = "",
    id,
    ...props
  },
  ref
) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseInputClasses = `
    w-full px-4 py-2.5 rounded-lg border transition-all duration-200
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-gray-100
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-offset-0
  `;

  const stateClasses = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
    : "border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-brand-200";

  const iconClasses = icon
    ? "pl-11 pr-4"
    : "px-4";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type === "number" ? "number" : type}
          required={required}
          className={`${baseInputClasses} ${stateClasses} ${iconClasses} ${className}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
      </div>

      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";