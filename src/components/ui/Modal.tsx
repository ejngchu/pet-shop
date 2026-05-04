"use client";

import { type ReactNode, useEffect, type UIEvent } from "react";
import { createPortal } from "react-dom";
import { motion, type Variants } from "framer-motion";

/** Modal size variants */
export type ModalSize = "sm" | "md" | "lg" | "full";

/** Props for Modal component */
export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Title displayed in the modal header */
  title?: string;
  /** Size of the modal */
  size?: ModalSize;
  /** Content of the modal */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether clicking overlay closes the modal */
  closeOnOverlayClick?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
}

/** Get size classes based on modal size */
function getSizeClasses(size: ModalSize): string {
  switch (size) {
    case "sm":
      return "max-w-sm";
    case "md":
      return "max-w-md";
    case "lg":
      return "max-w-2xl";
    case "full":
      return "max-w-full h-full";
    default:
      return "";
  }
}

/** Framer Motion animation variants for entrance */
const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/** Overlay animation variants */
const overlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

/**
 * A modal dialog component with Framer Motion animations.
 * Supports multiple sizes and overlay click to close.
 * Uses forwardRef for ref handling.
 * 
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm" size="md">
 *   <p>Are you sure?</p>
 * </Modal>
 * ```
 */
export function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
  className = "",
  closeOnOverlayClick = true,
  showCloseButton = true,
}: ModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle overlay click
  function handleOverlayClick(event: UIEvent<HTMLDivElement>) {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  }

  if (!isOpen) return null;

  const sizeClasses = getSizeClasses(size);
  const isFullScreen = size === "full";

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50"
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />

      {/* Modal Content */}
      <motion.div
        className={`
          relative w-full ${sizeClasses} ${isFullScreen ? "h-full" : "bg-white dark:bg-gray-900 rounded-xl shadow-modal"}
          ${className}
        `}
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Close Button */}
        {showCloseButton && !isFullScreen && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 pb-0">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              {title}
            </h2>
            {isFullScreen && showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={isFullScreen ? "flex-1 overflow-auto" : "p-6"}>
          {children}
        </div>
      </motion.div>
    </div>
  );

  // Use portal to render at document body level
  if (typeof window === "undefined") return null;

  return createPortal(modalContent, document.body);
}