import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const variants = {
  primary:
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-bg-hover)] hover:shadow-[var(--btn-primary-shadow-hover)] hover:-translate-y-0.5",

  brass:
    "relative overflow-hidden bg-gradient-to-b from-[var(--brass-300)] to-[var(--brass-500)] text-[var(--navy-950)] shadow-[var(--shadow-accent),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_12px_24px_rgba(192,138,62,0.45),inset_0_1px_0_rgba(255,255,255,0.6)] hover:-translate-y-1 transition-all duration-300",

  ink:
    "bg-[var(--btn-dark-bg)] text-[var(--btn-dark-text)] hover:-translate-y-0.5",

  outline:
    "bg-transparent text-[var(--text-on-light)] border border-[var(--btn-outline-on-light-border)] hover:border-[var(--btn-outline-on-light-hover-border)] hover:-translate-y-0.5",

  ghost:
    "bg-transparent text-[var(--btn-ghost-on-dark-text)] border border-[var(--btn-ghost-on-dark-border)] hover:border-[var(--btn-ghost-on-dark-hover-border)] hover:-translate-y-0.5",

  "outline-light":
    "bg-transparent text-[var(--text-on-dark)] border border-[var(--line-on-dark)] hover:border-[var(--text-on-dark)] hover:-translate-y-0.5",
};

const sizes = {
  sm: "h-9 px-5 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  xl: "h-14 px-10 text-base font-semibold",
};

const roundedStyles = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    rounded = "full",
    className = "",
    children,
    loading = false,
    disabled = false,
    as: Component = "button",
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2.5",
        "font-bold",
        "cursor-pointer",
        "leading-none",
        "whitespace-nowrap",
        "transition-all duration-300 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        roundedStyles[rounded],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.25"
            />
            <path
              d="M22 12a10 10 0 0 1-10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </Component>
  );
});

export default Button;