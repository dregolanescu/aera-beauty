import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "ghost";
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "button-label inline-flex items-center justify-center px-7 py-3.5 transition-colors duration-200";

  const variants = {
    primary: "bg-cocoa-700 text-ivory-50 hover:bg-cocoa-900",
    ghost:
      "bg-transparent text-cocoa-700 border-[0.5px] border-cocoa-700 hover:bg-cocoa-700 hover:text-ivory-50",
  };

  const classes = cn(base, variants[variant], className);
  const style = { borderRadius: "2px" };

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
