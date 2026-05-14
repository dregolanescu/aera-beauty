import type { Metadata } from "next";
import { bodoniModa, notoSerifDisplay, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aerabeauty.ro"),
  title: {
    default: "AERA Beauty — Frumusețe curată, centrată pe piele",
    template: "%s · AERA Beauty",
  },
  description:
    "Trei branduri premium aduse în România: Aqua Mineral, Oliere Paris și Redefine Matcha. Skincare cu minerale din Marea Moartă și haircare profesional cu uleiuri naturale.",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://aerabeauty.ro",
    siteName: "AERA Beauty",
    title: "AERA Beauty — Frumusețe curată, centrată pe piele",
    description:
      "Trei branduri premium aduse în România: Aqua Mineral, Oliere Paris și Redefine Matcha.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${bodoniModa.variable} ${notoSerifDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-100 text-cocoa-700">
        {children}
      </body>
    </html>
  );
}
