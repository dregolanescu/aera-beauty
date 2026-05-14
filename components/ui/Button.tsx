import Link from "next/link";
import { cn } from "@/lib/utils";
import { MovingBorderButton } from "./MovingBorderButton";

type ButtonProps = {
  variant?: "primary" | "ghost";
  size?: "default" | "sm";
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const sizeStyles = {
  default: {
    fontSize: "0.78rem",
    letterSpacing: "0.08em",
    padding: "12px 22px",
    minHeight: "42px",
  },
  sm: {
    fontSize: "0.72rem",
    letterSpacing: "0.08em",
    padding: "10px 18px",
    minHeight: "36px",
  },
} as const;

export function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  // Primary — delegates to MovingBorderButton (shadows + travelling light)
  if (variant === "primary") {
    return (
      <MovingBorderButton
        href={href}
        onClick={onClick}
        type={type}
        size={size}
        className={className}
      >
        {children}
      </MovingBorderButton>
    );
  }

  // Ghost — elegant, warm beige hover, no shadow
  const ghostClasses = cn(
    "inline-flex items-center justify-center font-medium uppercase",
    "bg-transparent text-cocoa-700 rounded-[14px]",
    "border-[0.5px] border-cocoa-700",
    "transition-all duration-[280ms] ease-out",
    "hover:bg-cream-100 hover:text-cocoa-900",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={ghostClasses} style={sizeStyles[size]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={ghostClasses}
      style={sizeStyles[size]}
    >
      {children}
    </button>
  );
}
