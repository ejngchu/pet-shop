/** Badge component variants */
export type BadgeVariant = "default" | "success" | "warning" | "danger";

/** Badge sizes */
export type BadgeSize = "sm" | "md";

/** Props for Badge component */
export interface BadgeProps {
  /** Text content of the badge */
  children: string;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Whether to show a dot indicator */
  dot?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Optional ID for the badge */
  id?: string;
}

/** Get variant classes based on badge variant */
function getVariantClasses(variant: BadgeVariant): string {
  switch (variant) {
    case "default":
      return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    case "success":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "warning":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "danger":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "";
  }
}

/** Get size classes based on badge size */
function getSizeClasses(size: BadgeSize): string {
  switch (size) {
    case "sm":
      return "px-2 py-0.5 text-xs";
    case "md":
      return "px-2.5 py-1 text-sm";
    default:
      return "";
  }
}

/** Get dot color classes based on variant */
function getDotColorClasses(variant: BadgeVariant): string {
  switch (variant) {
    case "default":
      return "bg-gray-500";
    case "success":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "danger":
      return "bg-red-500";
    default:
      return "";
  }
}

/**
 * A badge component for labeling and status indication.
 * Supports multiple variants and sizes with optional dot indicator.
 * 
 * @example
 * ```tsx
 * <Badge variant="success" size="md" dot>Active</Badge>
 * ```
 */
export function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  id,
}: BadgeProps) {
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const dotColorClasses = getDotColorClasses(variant);

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${variantClasses} ${sizeClasses} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColorClasses}`} />
      )}
      {children}
    </span>
  );
}