import type { Metadata } from "next";
import { Suspense } from "react";
import { bodoniModa, notoSerifDisplay, inter } from "./fonts";
import { PrecomandaProvider } from "@/components/precomanda/PrecomandaContext";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aerabeauty.ro"),
  title: {
    default: "AERA Beauty — For the love of Beauty",
    template: "%s · AERA Beauty",
  },
  description:
    "Îngrijire premium atent selectată de AERA Beauty: Aqua Mineral, skincare cu minerale din Marea Moartă. Reprezentată cu grijă în România.",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://aerabeauty.ro",
    siteName: "AERA Beauty",
    title: "AERA Beauty — For the love of Beauty",
    description:
      "Îngrijire premium atent selectată de AERA Beauty: Aqua Mineral, skincare cu minerale din Marea Moartă.",
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
        <CookieBanner />
      </body>
    </html>
  );
}
