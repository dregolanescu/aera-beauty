import Link from "next/link";
import { cn } from "@/lib/utils";

type MovingBorderButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "default" | "sm";
};

const sizeStyles = {
  default: {
    fontSize: "0.78rem",
    letterSpacing: "0.10em",
    padding: "14px 32px",
    minHeight: "46px",
  },
  sm: {
    fontSize: "0.72rem",
    letterSpacing: "0.08em",
    padding: "10px 18px",
    minHeight: "36px",
  },
} as const;

/**
 * Primary button with permanent rotating halo on inner border.
 *
 * Structure: wrap (2px padding) > halo (gradient) + face (mocha solid).
 * The 2px gap between wrap (18px radius) and face (16px radius)
 * reveals the rotating conic gradient — like light travelling along
 * the edge of lacquered packaging.
 *
 * CSS classes in globals.css: .aera-cta-wrap, .aera-cta-halo, .aera-cta-face
 */
export function MovingBorderButton({
  href,
  children,
  className,
  onClick,
  type = "button",
  size = "default",
}: MovingBorderButtonProps) {
  const faceStyle = sizeStyles[size];

  const inner = (
    <>
      <span className="aera-cta-halo" aria-hidden="true" />
      <span className="aera-cta-face" style={faceStyle}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("aera-cta-wrap", className)}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn("aera-cta-wrap", className)}
    >
      {inner}
    </button>
  );
}
