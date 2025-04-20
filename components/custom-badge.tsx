import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "outline" | "success" | "destructive"
  className?: string
}

export function CustomBadge({ children, variant = "default", className = "" }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100",
    outline: "text-gray-900 border border-gray-200 dark:text-gray-100 dark:border-gray-700",
    success: "bg-green-500 text-white hover:bg-green-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  }

  return <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</span>
}
