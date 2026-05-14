import { Bodoni_Moda, Noto_Serif_Display, Inter } from "next/font/google";

export const bodoniModa = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-bodoni-moda",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const notoSerifDisplay = Noto_Serif_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-noto-serif-display",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500"],
});
