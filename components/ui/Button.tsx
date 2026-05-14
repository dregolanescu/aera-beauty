import Link from "next/link";
import { cn } from "@/lib/utils";
import { MovingBorderButton } from "./MovingBorderButton";

type ButtonProps = {
  variant?: "primary" | "ghost";
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const btnStyle = {
  fontSize: "0.78rem",
  letterSpacing: "0.08em",
  padding: "0.85rem 1.4rem",
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  // Primary variant — delegates to MovingBorderButton (travelling light effect)
  if (variant === "primary") {
    return (
      <MovingBorderButton
        href={href}
        onClick={onClick}
        type={type}
        className={className}
      >
        {children}
      </MovingBorderButton>
    );
  }

  // Ghost variant
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
      <Link href={href} className={ghostClasses} style={btnStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={ghostClasses}
      style={btnStyle}
    >
      {children}
    </button>
  );
}
