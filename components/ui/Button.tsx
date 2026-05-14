import { MovingBorderButton } from "./MovingBorderButton";
import { ShinyGhostButton } from "./ShinyGhostButton";

type ButtonProps = {
  variant?: "primary" | "ghost";
  size?: "default" | "sm";
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
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

  return (
    <ShinyGhostButton
      href={href}
      onClick={onClick}
      type={type}
      size={size}
      className={className}
    >
      {children}
    </ShinyGhostButton>
  );
}
