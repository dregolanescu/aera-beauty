import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Preț în lei, după convenția românească: „165 RON", „1.250 RON". */
export function formatPriceRon(value: number): string {
  return `${new Intl.NumberFormat("ro-RO").format(value)} RON`;
}
