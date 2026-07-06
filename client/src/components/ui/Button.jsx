import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const variants = {
  primary:
    "bg-gradient-to-b from-primary-light to-primary-dark text-white border-t border-white/20 border-b border-black/20 shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] hover:-translate-y-0.5",

  brass:
    "bg-gradient-to-b from-[#D4A35B] to-primary text-white border-t border-white/20 border-b border-black/20 shadow-[0_4px_14px_rgba(197,138,56,0.4)] hover:shadow-[0_6px_20px_rgba(197,138,56,0.6)] hover:-translate-y-0.5",

  ink:
    "bg-gradient-to-b from-slate-700 to-slate-900 text-white border-t border-white/10 border-b border-black/40 shadow-[0_4px_14px_rgba(15,23,42,0.4)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.6)] hover:-translate-y-0.5",

  outline:
    "bg-bg-surface shadow-sm border border-bd-subtle backdrop-blur-xl text-tx-secondary font-medium border border-bd-subtle/80 hover:bg-bg-surface hover:border-bd-strong shadow-sm hover:shadow-md hover:-translate-y-0.5",

  ghost:
    "bg-transparent text-tx-primary border border-transparent hover:bg-bg-subtle hover:text-tx-primary",

  "outline-light":
    "bg-bg-surface shadow-sm border border-bd-subtle backdrop-blur-xl text-white border border-white/20 hover:bg-bg-surface shadow-sm border border-bd-subtle hover:border-white/40 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:-translate-y-0.5",
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