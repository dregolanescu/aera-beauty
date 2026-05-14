import type { Metadata } from "next";
import { Suspense } from "react";
import { bodoniModa, notoSerifDisplay, inter } from "./fonts";
import { PrecomandaProvider } from "@/components/precomanda/PrecomandaContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aerabeauty.ro"),
  title: {
    default: "AERA Beauty — For the love of Beauty",
    template: "%s · AERA Beauty",
  },
  description:
    "Branduri premium de skincare și haircare, atent selectate de AERA Beauty: Aqua Mineral, Oliere Paris și Redefine Matcha. Reprezentate cu grijă în România.",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://aerabeauty.ro",
    siteName: "AERA Beauty",
    title: "AERA Beauty — For the love of Beauty",
    description:
      "Branduri premium de skincare și haircare, atent selectate de AERA Beauty: Aqua Mineral, Oliere Paris și Redefine Matcha.",
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
        <Suspense>
          <PrecomandaProvider>{children}</PrecomandaProvider>
        </Suspense>
      </body>
    </html>
  );
}
