import { type CSSProperties, type ReactNode } from "react";

/** Card component variants */
export type CardVariant = "default" | "outlined" | "elevated";

/** Card padding sizes */
export type CardPadding = "none" | "sm" | "md" | "lg";

/** Props for Card component */
export interface CardProps {
  /** The content of the card */
  children: ReactNode;
  /** Visual style variant */
  variant?: CardVariant;
  /** Padding size inside the card */
  padding?: CardPadding;
  /** Optional additional CSS classes */
  className?: string;
  /** Optional ID for the card */
  id?: string;
  /** Whether to enable hover effect */
  hover?: boolean;
  /** Additional custom styles */
  style?: CSSProperties;
}

/** Get variant classes based on card variant */
function getVariantClasses(variant: CardVariant, hover: boolean): string {
  const hoverClasses = hover
    ? "transition-all duration-300 hover:shadow-pet-hover hover:-translate-y-0.5 cursor-pointer"
    : "";

  switch (variant) {
    case "default":
      return `bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${hoverClasses}`;
    case "outlined":
      return `bg-transparent border-2 border-gray-200 dark:border-gray-700 ${hoverClasses}`;
    case "elevated":
      return `bg-white dark:bg-gray-900 shadow-card hover:shadow-pet ${hoverClasses}`;
    default:
      return "";
  }
}

/** Get padding classes based on padding size */
function getPaddingClasses(padding: CardPadding): string {
  switch (padding) {
    case "none":
      return "p-0";
    case "sm":
      return "p-3";
    case "md":
      return "p-5";
    case "lg":
      return "p-8";
    default:
      return "";
  }
}

/**
 * A flexible card component with multiple variants and padding options.
 * Supports hover effects for interactive cards.
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" padding="md" hover>
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export function Card({
  children,
  variant = "default",
  padding = "md",
  className = "",
  id,
  hover = false,
  style,
}: CardProps) {
  const variantClasses = getVariantClasses(variant, hover);
  const paddingClasses = getPaddingClasses(padding);

  return (
    <div
      id={id}
      className={`rounded-xl ${variantClasses} ${paddingClasses} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}