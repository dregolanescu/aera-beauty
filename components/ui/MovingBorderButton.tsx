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
 * Primary button with permanent rotating halo on border.
 *
 * Visual language: premium beauty packaging detail.
 * - Mocha solid background (#5B4638)
 * - Pseudo-element `::before` with inset -2px sits behind the button
 * - Conic gradient with pearlescent white peak rotates continuously (4s)
 * - Outer drop shadow adds soft ambient glow on cream backgrounds
 * - Hover lifts -1px and intensifies the outer glow
 *
 * Implementation in `app/globals.css` via class `.aera-cta-glow`.
 * Respects prefers-reduced-motion (animation disabled, static gradient retained).
 */
export function MovingBorderButton({
  href,
  children,
  className,
  onClick,
  type = "button",
  size = "default",
}: MovingBorderButtonProps) {
  const classes = cn("aera-cta-glow", className);
  const style = sizeStyles[size];

  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={style}>
      {children}
    </button>
  );
}
